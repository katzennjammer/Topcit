import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Trophy, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { getAllStats } from '../utils/storage';

export function HomePage({ quizList, onSelectQuiz, onRestartQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const stats = getAllStats();

  const categories = useMemo(() => {
    const cats = ['All'];
    quizList.forEach((q) => {
      if (q.category && !cats.includes(q.category)) {
        cats.push(q.category);
      }
    });
    return cats;
  }, [quizList]);

  const filteredQuizzes = useMemo(() => {
    return quizList.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || quiz.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [quizList, searchQuery, selectedCategory]);

  const totalQuestions = useMemo(() => {
    return quizList.reduce((acc, curr) => acc + (curr.questionCount || 0), 0);
  }, [quizList]);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-banner card">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Interactive Competency Practice</span>
          </div>
          <h1 className="hero-title">
            Master <span className="gradient-text">TOPCIT</span> Concepts
          </h1>
          <p className="hero-subtitle">
            Clean, lightweight, and focused review for IT professionals and students. Select a domain below to begin your practice.
          </p>

          {/* Quick Overview Metrics */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <BookOpen size={18} className="stat-icon" />
              <div>
                <span className="hero-stat-val">{quizList.length}</span>
                <span className="hero-stat-lbl">Modules</span>
              </div>
            </div>

            <div className="hero-stat-item">
              <Target size={18} className="stat-icon" />
              <div>
                <span className="hero-stat-val">{totalQuestions}</span>
                <span className="hero-stat-lbl">Questions</span>
              </div>
            </div>

            <div className="hero-stat-item">
              <Trophy size={18} className="stat-icon" />
              <div>
                <span className="hero-stat-val">{stats.totalQuizzesAttempted}</span>
                <span className="hero-stat-lbl">Completed</span>
              </div>
            </div>

            <div className="hero-stat-item">
              <CheckCircle2 size={18} className="stat-icon" />
              <div>
                <span className="hero-stat-val">{stats.overallAccuracy}%</span>
                <span className="hero-stat-lbl">Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search quizzes by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="quiz-grid">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onSelectQuiz={onSelectQuiz}
              onRestartQuiz={onRestartQuiz}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <h3>No Quizzes Found</h3>
          <p>We couldn't find any quiz matching "{searchQuery}". Try searching for something else.</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      <style>{`
        .home-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .hero-banner {
          padding: 2.5rem 2rem;
          background: linear-gradient(135deg, var(--surface), var(--background));
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 760px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          width: fit-content;
        }

        .hero-title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }

        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-icon {
          color: var(--primary);
        }

        .hero-stat-val {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .hero-stat-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .controls-bar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .search-box {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .category-filters {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: none;
        }

        .category-filters::-webkit-scrollbar {
          display: none;
        }

        .filter-chip {
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          background-color: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .filter-chip:hover {
          color: var(--text);
          border-color: var(--text-muted);
        }

        .filter-chip.active {
          background-color: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
          box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
        }

        .quiz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .empty-state {
          padding: 3rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .hero-banner {
            padding: 1.75rem 1.25rem;
          }

          .hero-title {
            font-size: 1.75rem;
          }

          .quiz-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
