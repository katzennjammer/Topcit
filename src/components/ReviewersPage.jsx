import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BookOpen, 
  Code, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  CheckSquare, 
  HelpCircle,
  Play,
  ArrowUp,
  FileText,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { REVIEWER_MODULES, loadReviewerMarkdown } from '../utils/reviewerLoader';

const ICON_MAP = {
  Code,
  Database,
  Cpu,
  ShieldCheck,
  Briefcase,
  CheckSquare,
};

export function ReviewersPage({ activeReviewerId, onSelectReviewer, onStartQuizForModule }) {
  const [selectedModuleId, setSelectedModuleId] = useState(activeReviewerId || 'Essence 1');
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeModule = useMemo(() => {
    return REVIEWER_MODULES.find((m) => m.id === selectedModuleId) || REVIEWER_MODULES[0];
  }, [selectedModuleId]);

  const IconComponent = ICON_MAP[activeModule.iconName] || HelpCircle;

  // Load markdown text when module changes
  useEffect(() => {
    let isMounted = true;
    async function fetchContent() {
      try {
        setLoading(true);
        const text = await loadReviewerMarkdown(activeModule.filename);
        if (isMounted) {
          setMarkdownContent(text);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setMarkdownContent('# Error Loading Content\nCould not load reviewer markdown file.');
          setLoading(false);
        }
      }
    }
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [activeModule]);

  // Scroll position monitor for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="reviewers-page animate-fade-in">
      {/* Layout Split: Sidebar Navigation + Main Reading Viewer */}
      <div className="reviewers-layout">
        {/* Module Sidebar */}
        <aside className="reviewers-sidebar card">
          <div className="sidebar-header">
            <FileText size={18} className="icon-primary" />
            <h3 className="sidebar-title">TOPCIT Reviewers</h3>
          </div>

          <nav className="modules-nav">
            {REVIEWER_MODULES.map((mod) => {
              const ModIcon = ICON_MAP[mod.iconName] || HelpCircle;
              const isActive = mod.id === selectedModuleId;
              return (
                <button
                  key={mod.id}
                  className={`module-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    if (onSelectReviewer) onSelectReviewer(mod.id);
                    scrollToTop();
                  }}
                >
                  <div className="nav-item-icon" style={{ color: mod.color, backgroundColor: mod.accentLight }}>
                    <ModIcon size={18} />
                  </div>
                  <div className="nav-item-text">
                    <span className="nav-item-title">{mod.title.replace(' Reviewer', '')}</span>
                    <span className="nav-item-id">{mod.id}</span>
                  </div>
                  <ChevronRight size={16} className="nav-item-arrow" />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="reviewer-viewer-container">
          {/* Header Module Banner */}
          <div className="reviewer-banner card">
            <div className="banner-left">
              <div className="banner-icon-box" style={{ backgroundColor: activeModule.accentLight, color: activeModule.color }}>
                <IconComponent size={28} />
              </div>
              <div className="banner-info">
                <div className="banner-tags">
                  <span className="mod-badge">{activeModule.id}</span>
                  <span className="cat-badge">{activeModule.category}</span>
                </div>
                <h1 className="banner-title">{activeModule.title}</h1>
                <p className="banner-description">{activeModule.description}</p>
              </div>
            </div>

            <div className="banner-right">
              {onStartQuizForModule && (
                <button
                  className="btn btn-primary practice-quiz-btn"
                  onClick={() => onStartQuizForModule(activeModule.essenceId)}
                >
                  <Play size={16} /> Take Quiz
                </button>
              )}
            </div>
          </div>

          {/* Markdown Content Box */}
          <div className="markdown-paper card">
            {loading ? (
              <div className="loading-state-inline">
                <Loader2 size={36} className="spinner" />
                <p>Loading Study Material...</p>
              </div>
            ) : (
              <article className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdownContent}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </main>
      </div>

      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} title="Scroll to top">
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        .reviewers-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .reviewers-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* Sidebar Styles */
        .reviewers-sidebar {
          padding: 1.25rem;
          position: sticky;
          top: 5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .modules-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .module-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-sans);
          transition: all var(--transition-fast);
        }

        .module-nav-item:hover {
          background-color: var(--surface-hover);
        }

        .module-nav-item.active {
          background-color: var(--primary-light);
          border-color: var(--primary);
        }

        .nav-item-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-item-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .nav-item-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text);
        }

        .nav-item-id {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .nav-item-arrow {
          color: var(--text-light);
          transition: transform var(--transition-fast);
        }

        .module-nav-item.active .nav-item-arrow {
          transform: translateX(2px);
          color: var(--primary);
        }

        /* Main Content Container */
        .reviewer-viewer-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          min-width: 0;
        }

        .reviewer-banner {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          background: linear-gradient(135deg, var(--surface), var(--background));
        }

        .banner-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .banner-icon-box {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .banner-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .banner-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mod-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .cat-badge {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .banner-title {
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.3;
        }

        .banner-description {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .practice-quiz-btn {
          white-space: nowrap;
        }

        /* Search Bar */
        .reviewer-search-bar {
          width: 100%;
        }

        .search-input-box {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          font-family: var(--font-sans);
          font-size: 0.925rem;
          color: var(--text);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .clear-search-btn {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.25rem;
          color: var(--text-muted);
          cursor: pointer;
        }

        /* Markdown Paper & Body */
        .markdown-paper {
          padding: 2.5rem;
          min-height: 500px;
          background-color: var(--surface);
          border-radius: var(--radius-xl);
        }

        .loading-state-inline {
          padding: 4rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }

        /* Markdown Rendered Typography */
        .markdown-body {
          color: var(--text);
          line-height: 1.7;
          font-family: var(--font-sans);
          font-size: 1rem;
        }

        .markdown-body h1 {
          font-size: 1.85rem;
          font-weight: 800;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--border);
          color: var(--text);
        }

        .markdown-body h2 {
          font-size: 1.45rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.85rem;
          color: var(--primary);
        }

        .markdown-body h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text);
        }

        .markdown-body p {
          margin-bottom: 1rem;
        }

        .markdown-body ul, .markdown-body ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .markdown-body li {
          margin-bottom: 0.35rem;
        }

        .markdown-body strong {
          color: var(--text);
          font-weight: 700;
        }

        .markdown-body blockquote {
          margin: 1.25rem 0;
          padding: 0.85rem 1.25rem;
          background-color: var(--background);
          border-left: 4px solid var(--primary);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          color: var(--text-muted);
        }

        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          overflow-x: auto;
          display: block;
        }

        .markdown-body th {
          background-color: var(--background);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 700;
          color: var(--text);
        }

        .markdown-body td {
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          color: var(--text);
        }

        .markdown-body tr:nth-child(even) {
          background-color: var(--surface-hover);
        }

        .markdown-body code {
          background-color: var(--background);
          border: 1px solid var(--border);
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          font-family: monospace;
          font-size: 0.875rem;
        }

        /* Floating Scroll Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background-color: var(--primary);
          color: var(--on-primary);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-fast);
          z-index: 40;
        }

        .scroll-top-btn:hover {
          transform: translateY(-3px);
          background-color: var(--primary-hover);
        }

        @media (max-width: 900px) {
          .reviewers-layout {
            grid-template-columns: 1fr;
          }

          .reviewers-sidebar {
            position: relative;
            top: 0;
          }

          .banner-left {
            flex-direction: column;
          }

          .reviewer-banner {
            flex-direction: column;
            align-items: flex-start;
          }

          .markdown-paper {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
