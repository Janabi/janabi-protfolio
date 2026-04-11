'use client';

import './Dock.css';

export const DOCK_APPS = [
  { id: 'finder', label: 'Finder', icon: '📁' },
  { id: 'terminal', label: 'Terminal', icon: '💻' },
  { id: 'browser', label: 'Browser', icon: '🌐' },
  { id: 'mail', label: 'Mail', icon: '✉️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: '__separator', separator: true },
  { id: 'trash', label: 'Trash', icon: '🗑️' },
];

export function getDockAppMeta(appId) {
  const item = DOCK_APPS.find((a) => !a.separator && a.id === appId);
  return item
    ? { label: item.label, icon: item.icon }
    : { label: appId, icon: '📎' };
}

const SEPARATOR_INDEX = DOCK_APPS.findIndex((item) => item.separator);
const MAIN_APPS = DOCK_APPS.slice(0, SEPARATOR_INDEX);
const TAIL_APPS = DOCK_APPS.slice(SEPARATOR_INDEX);

export default function Dock({
  onAppLaunch,
  minimizedWindows = [],
  onRestoreMinimized,
}) {
  return (
    <nav className="dock" aria-label="Dock">
      <div className="dock__panel">
        <div className="dock__main-apps">
          {MAIN_APPS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="dock__app"
              aria-label={item.label}
              title={item.label}
              onClick={() => onAppLaunch?.(item.id)}
            >
              <span className="dock__icon" aria-hidden="true">
                {item.icon}
              </span>
            </button>
          ))}
        </div>

        {minimizedWindows.length > 0 ? (
          <div
            className="dock__minimized"
            role="toolbar"
            aria-label="Minimized windows"
          >
            {minimizedWindows.map((w) => (
              <button
                key={w.id}
                type="button"
                className="dock__app dock__app--minimized"
                aria-label={`Restore ${w.label}`}
                title={`Restore ${w.label}`}
                onClick={() => onRestoreMinimized?.(w.id)}
              >
                <span className="dock__icon" aria-hidden="true">
                  {w.icon}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {TAIL_APPS.map((item) =>
          item.separator ? (
            <div
              key={item.id}
              className="dock__separator"
              role="presentation"
              aria-hidden="true"
            />
          ) : (
            <button
              key={item.id}
              type="button"
              className="dock__app"
              aria-label={item.label}
              title={item.label}
              onClick={() => onAppLaunch?.(item.id)}
            >
              <span className="dock__icon" aria-hidden="true">
                {item.icon}
              </span>
            </button>
          )
        )}
      </div>
    </nav>
  );
}
