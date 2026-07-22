import React from 'react';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';

export function Header({ theme, onToggleTheme, currentView, onGoHome, activeQuizTitle }) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand" onClick={onGoHome} role="button" tabIndex={0}>
          <div className="logo-icon">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">TOPCIT</span>
            <span className="brand-subtitle">Review</span>
          </div>
        </div>

        {/* Active Breadcrumb / Title if in Quiz Mode */}
        {activeQuizTitle && currentView !== 'home' && (
          <div className="active-quiz-badge">
            <BookOpen size={14} />
            <span>{activeQuizTitle}</span>
          </div>
        )}

        {/* Actions Right */}
        <div className="header-actions">
          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <style>{`
        .site-header {
          background-color: var(--surface);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
        }

        .brand-text {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .brand-title {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .active-quiz-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .active-quiz-badge {
            display: none;
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .theme-toggle-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--surface-hover);
          color: var(--text);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
      `}</style>
    </header>
  );
}
