import { LayoutGrid, Code2, PenTool, Timer, BookOpen, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutGrid },
  { id: 'code', label: 'Performance lab', Icon: Code2 },
  { id: 'diagram', label: 'Diagram lab', Icon: PenTool },
  { id: 'exam', label: 'Mock exam', Icon: Timer },
  { id: 'reviewers', label: 'Reviewers', Icon: BookOpen },
];

/** The four bars are the official module weights: 365, 265, 235 and 135 points. */
function WeightMark() {
  return (
    <span className="weight-mark" aria-hidden="true">
      <i style={{ flex: 365, background: 'var(--m1)' }} />
      <i style={{ flex: 265, background: 'var(--m2)' }} />
      <i style={{ flex: 235, background: 'var(--m3)' }} />
      <i style={{ flex: 135, background: 'var(--m4)' }} />
    </span>
  );
}

export function Sidebar({ active, onNavigate, theme, onToggleTheme }) {
  return (
    <aside className="rail">
      <button className="rail-brand" onClick={() => onNavigate('dashboard')} aria-label="Topcit, go to dashboard">
        <span className="rail-wordmark">Topcit</span>
        <WeightMark />
      </button>

      <nav className="rail-nav" aria-label="Main">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`rail-link ${active === id ? 'active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button className="rail-theme" onClick={onToggleTheme}>
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </aside>
  );
}
