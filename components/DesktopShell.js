'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppWindow from '@/components/AppWindow';
import DockAppContent from '@/components/apps/DockAppContent';
import Dock, { DOCK_APPS, getDockAppMeta } from '@/components/Dock';
import TopMenuBar from '@/components/TopMenuBar';
import '@/app/shell.css';

const APP_DEFAULT_SIZES = {
  mail: { width: 440, height: 380 },
  browser: { width: 900, height: 600 },
  default: { width: 520, height: 400 },
};

/** Must stay in sync with .app-window chrome in AppWindow.css */
const VIEWPORT_CHROME = {
  menubar: 48,
  dock: 96,
  pad: 16,
  minWidth: 280,
  minHeight: 200,
};

function getAppLaunchSize(appId) {
  return APP_DEFAULT_SIZES[appId] ?? APP_DEFAULT_SIZES.default;
}

/**
 * Keeps window width/height within the visible viewport and position on-screen.
 * Uses innerWidth/innerHeight so sizing matches the layout viewport (avoids 100vw scrollbar overflow).
 */
function fitWindowToViewport(vw, vh, x, y, width, height) {
  const { menubar, dock, pad, minWidth, minHeight } = VIEWPORT_CHROME;
  const maxW = vw - pad;
  const maxH = vh - menubar - dock - pad;

  let w = Math.min(width, maxW);
  let h = Math.min(height, maxH);
  w = Math.max(minWidth, w);
  h = Math.max(minHeight, h);
  w = Math.min(w, maxW);
  h = Math.min(h, maxH);

  const minX = pad / 2;
  const minY = menubar;
  const maxX = vw - w - pad / 2;
  const maxY = vh - h - dock - pad / 2;

  let nx = x;
  let ny = y;
  if (maxX >= minX) {
    nx = Math.min(Math.max(minX, nx), maxX);
  } else {
    nx = minX;
  }
  if (maxY >= minY) {
    ny = Math.min(Math.max(minY, ny), maxY);
  } else {
    ny = minY;
  }

  return {
    x: Math.round(nx),
    y: Math.round(ny),
    width: Math.round(w),
    height: Math.round(h),
  };
}

function clampWindowPosition(vw, vh, x, y, width, height) {
  const { menubar, dock, pad } = VIEWPORT_CHROME;
  const minX = pad / 2;
  const minY = menubar;
  const maxX = vw - width - pad / 2;
  const maxY = vh - height - dock - pad / 2;
  let nx = x;
  let ny = y;
  if (maxX >= minX) {
    nx = Math.min(Math.max(minX, nx), maxX);
  } else {
    nx = minX;
  }
  if (maxY >= minY) {
    ny = Math.min(Math.max(minY, ny), maxY);
  } else {
    ny = minY;
  }
  return { x: Math.round(nx), y: Math.round(ny) };
}

export default function DesktopShell({ children }) {
  const [windows, setWindows] = useState([]);
  const zCounterRef = useRef(100);

  const bumpZ = useCallback(() => {
    zCounterRef.current += 1;
    return zCounterRef.current;
  }, []);

  const bringToFront = useCallback(
    (id) => {
      const z = bumpZ();
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w))
      );
    },
    [bumpZ]
  );

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const restoreMinimized = useCallback(
    (id) => {
      const z = bumpZ();
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: z } : w
        )
      );
    },
    [bumpZ]
  );

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          const r = w.restoreBounds;
          if (!r) {
            return { ...w, maximized: false, restoreBounds: null };
          }
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const fitted = fitWindowToViewport(vw, vh, r.x, r.y, r.width, r.height);
          return {
            ...w,
            maximized: false,
            restoreBounds: null,
            x: fitted.x,
            y: fitted.y,
            width: fitted.width,
            height: fitted.height,
          };
        }
        return {
          ...w,
          maximized: true,
          restoreBounds: {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height,
          },
        };
      })
    );
  }, []);

  const dragDelta = useCallback((id, dx, dy) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id || w.maximized) return w;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pos = clampWindowPosition(vw, vh, w.x + dx, w.y + dy, w.width, w.height);
        return { ...w, x: pos.x, y: pos.y };
      })
    );
  }, []);

  const openOrFocusAppWindow = useCallback(
    (appId) => {
      const meta = DOCK_APPS.find((a) => !a.separator && a.id === appId);
      if (!meta) return;

      const z = bumpZ();
      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId);
        const rest = prev.filter((w) => w.appId !== appId);
        if (existing) {
          return [
            ...rest,
            {
              ...existing,
              minimized: false,
              zIndex: z,
            },
          ];
        }
        const { width: reqW, height: reqH } = getAppLaunchSize(appId);
        const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 600;
        const openVisible = rest.filter((w) => !w.minimized).length;
        const stagger = (openVisible % 6) * 26;
        const x0 = Math.max(24, Math.round((vw - reqW) / 2 + stagger));
        const y0 = Math.max(56, Math.round((vh - reqH) / 2 - 24 + stagger));
        const { x, y, width, height } = fitWindowToViewport(
          vw,
          vh,
          x0,
          y0,
          reqW,
          reqH
        );
        return [
          ...rest,
          {
            id: `win-${appId}`,
            appId,
            title: meta.label,
            minimized: false,
            maximized: false,
            zIndex: z,
            x,
            y,
            width,
            height,
            restoreBounds: null,
          },
        ];
      });
    },
    [bumpZ]
  );

  const handleAppLaunch = useCallback(
    (appId) => {
      openOrFocusAppWindow(appId);
    },
    [openOrFocusAppWindow]
  );

  const minimizedWindows = windows
    .filter((w) => w.minimized)
    .map((w) => {
      const meta = getDockAppMeta(w.appId);
      return { id: w.id, appId: w.appId, label: meta.label, icon: meta.icon };
    });

  const openDockAppIds = useMemo(
    () => [...new Set(windows.map((w) => w.appId))],
    [windows]
  );

  const visibleWindows = windows.filter((w) => !w.minimized);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Escape') return;
      const visible = windows.filter((w) => !w.minimized);
      if (visible.length === 0) return;
      const top = visible.reduce((a, b) => (a.zIndex >= b.zIndex ? a : b));
      closeWindow(top.id);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [windows, closeWindow]);

  return (
    <div className="desktop-shell">
      <TopMenuBar />
      <div
        className="desktop-windows"
        aria-hidden={visibleWindows.length === 0}
      >
        {visibleWindows.map((w) => (
          <AppWindow
            key={w.id}
            title={w.title}
            maximized={w.maximized}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            zIndex={w.zIndex}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onToggleMaximize={() => toggleMaximize(w.id)}
            onActivate={() => bringToFront(w.id)}
            onDragDelta={(dx, dy) => dragDelta(w.id, dx, dy)}
          >
            <DockAppContent appId={w.appId} />
          </AppWindow>
        ))}
      </div>
      <div className="desktop-main">{children}</div>
      <Dock
        onAppLaunch={handleAppLaunch}
        openDockAppIds={openDockAppIds}
        minimizedWindows={minimizedWindows}
        onRestoreMinimized={restoreMinimized}
      />
    </div>
  );
}
