'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import AppWindow from '@/components/AppWindow';
import MailApp from '@/components/apps/MailApp';
import Dock, { getDockAppMeta } from '@/components/Dock';
import TopMenuBar from '@/components/TopMenuBar';
import '@/app/shell.css';

const MAIL_DEFAULT_SIZE = { width: 440, height: 380 };

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
          return {
            ...w,
            maximized: false,
            restoreBounds: null,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
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
        return { ...w, x: w.x + dx, y: w.y + dy };
      })
    );
  }, []);

  const openMailWindow = useCallback(() => {
    const z = bumpZ();
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === 'mail');
      const rest = prev.filter((w) => w.appId !== 'mail');
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
      const { width, height } = MAIL_DEFAULT_SIZE;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 600;
      const x = Math.max(24, Math.round((vw - width) / 2));
      const y = Math.max(56, Math.round((vh - height) / 2 - 24));
      return [
        ...rest,
        {
          id: 'win-mail',
          appId: 'mail',
          title: 'Mail',
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
  }, [bumpZ]);

  const handleAppLaunch = useCallback(
    (appId) => {
      if (appId === 'mail') {
        openMailWindow();
      }
    },
    [openMailWindow]
  );

  const minimizedWindows = windows
    .filter((w) => w.minimized)
    .map((w) => {
      const meta = getDockAppMeta(w.appId);
      return { id: w.id, appId: w.appId, label: meta.label, icon: meta.icon };
    });

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
            {w.appId === 'mail' ? <MailApp /> : null}
          </AppWindow>
        ))}
      </div>
      <div className="desktop-main">{children}</div>
      <Dock
        onAppLaunch={handleAppLaunch}
        minimizedWindows={minimizedWindows}
        onRestoreMinimized={restoreMinimized}
      />
    </div>
  );
}
