import React from 'react';
import { Sun, Moon, Sparkles, BookOpen, FileText, Star } from 'lucide-react';

function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Header({ 
  theme, 
  onToggleTheme, 
  currentView, 
  onGoHome, 
  activeQuizTitle,
  activeTab = 'quizzes',
  onTabChange
}) {
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

        {/* Navigation Tabs (when in main home view) */}
        {currentView === 'home' && (
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'quizzes' ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange('quizzes')}
            >
              <BookOpen size={16} />
              <span>Quizzes</span>
            </button>
            <button
              className={`nav-tab ${activeTab === 'reviewers' ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange('reviewers')}
            >
              <FileText size={16} />
              <span>Reviewers</span>
            </button>
          </nav>
        )}

        {/* Active Breadcrumb / Title if in Quiz Mode */}
        {activeQuizTitle && currentView !== 'home' && (
          <div className="active-quiz-badge">
            <BookOpen size={14} />
            <span>{activeQuizTitle}</span>
          </div>
        )}

        {/* Actions Right */}
        <div className="header-actions">
          {/* GitHub Link */}
          <a
            href="https://github.com/ire-zepelli/topcit-reviewer"
            target="_blank"
            rel="noopener noreferrer"
            className="github-nav-btn"
            title="View topcit-reviewer on GitHub"
          >
            <GithubIcon size={16} />
            <span className="github-btn-text">Project Repository</span>
          </a>

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

        .nav-tabs {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: var(--background);
          padding: 0.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
        }

        .nav-tab {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-tab:hover {
          color: var(--text);
        }

        .nav-tab.active {
          background-color: var(--surface);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
          font-weight: 700;
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

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .github-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--background);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .github-nav-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
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

        @media (max-width: 640px) {
          .active-quiz-badge {
            display: none;
          }

          .nav-tab span {
            display: none;
          }

          .nav-tab {
            padding: 0.4rem 0.6rem;
          }

          .github-btn-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
