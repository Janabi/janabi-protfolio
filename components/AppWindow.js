'use client';

import { useCallback, useRef } from 'react';
import './AppWindow.css';

export default function AppWindow({
  title,
  children,
  maximized,
  x,
  y,
  width,
  height,
  zIndex,
  onClose,
  onMinimize,
  onToggleMaximize,
  onActivate,
  onDragDelta,
}) {
  const lastPointer = useRef({ x: 0, y: 0 });

  const handleWindowPointerDown = useCallback(() => {
    onActivate?.();
  }, [onActivate]);

  const handleTitlePointerDown = useCallback(
    (e) => {
      if (maximized) return;
      onActivate?.();
      e.currentTarget.setPointerCapture(e.pointerId);
      lastPointer.current = { x: e.clientX, y: e.clientY };
    },
    [maximized, onActivate]
  );

  const handleTitlePointerMove = useCallback(
    (e) => {
      if (maximized || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const lx = lastPointer.current.x;
      const ly = lastPointer.current.y;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      if (dx !== 0 || dy !== 0) onDragDelta?.(dx, dy);
    },
    [maximized, onDragDelta]
  );

  const handleTitlePointerUp = useCallback((e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const stopFromTraffic = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const style = maximized
    ? { zIndex }
    : {
        left: x,
        top: y,
        width,
        height,
        zIndex,
      };

  return (
    <div
      className={`app-window${maximized ? ' app-window--maximized' : ''}`}
      style={style}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      onPointerDown={handleWindowPointerDown}
    >
      <div className="app-window__titlebar">
        <div className="app-window__traffic" onPointerDown={stopFromTraffic}>
          <button
            type="button"
            className="app-window__traffic-btn app-window__traffic-btn--close"
            aria-label="Close window"
            onClick={onClose}
          />
          <button
            type="button"
            className="app-window__traffic-btn app-window__traffic-btn--minimize"
            aria-label="Minimize window"
            onClick={onMinimize}
          />
          <button
            type="button"
            className="app-window__traffic-btn app-window__traffic-btn--zoom"
            aria-label={maximized ? 'Restore window size' : 'Maximize window'}
            onClick={onToggleMaximize}
          />
        </div>
        <div
          className="app-window__drag"
          onPointerDown={handleTitlePointerDown}
          onPointerMove={handleTitlePointerMove}
          onPointerUp={handleTitlePointerUp}
          onPointerCancel={handleTitlePointerUp}
        >
          {title}
        </div>
      </div>
      <div className="app-window__body">{children}</div>
    </div>
  );
}
