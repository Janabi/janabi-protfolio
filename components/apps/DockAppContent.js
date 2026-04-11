import BrowserApp from '@/components/apps/BrowserApp';
import MailApp from '@/components/apps/MailApp';

const PLACEHOLDER_COPY = {
  finder: 'Browse projects and files from here — wire this to your portfolio structure when ready.',
  terminal: 'A shell-style view for commands, logs, or dev notes.',
  settings: 'Theme, layout, and site preferences can live here.',
  trash: 'Recently removed items or a lighthearted recycle bin.',
};

export default function DockAppContent({ appId }) {
  if (appId === 'mail') {
    return <MailApp />;
  }
  if (appId === 'browser') {
    return <BrowserApp />;
  }

  const hint = PLACEHOLDER_COPY[appId];
  if (!hint) {
    return <p>This app is not connected yet.</p>;
  }

  return (
    <div className="dock-app-placeholder">
      <p>{hint}</p>
    </div>
  );
}
