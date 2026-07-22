import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { fetchAllQuizSummaries, loadQuizData } from './utils/quizLoader';
import { getThemePreference, setThemePreference, clearQuizDraft } from './utils/storage';
import { Loader2, AlertTriangle } from 'lucide-react';
import './App.css';

export function App() {
  const [theme, setTheme] = useState(getThemePreference);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'quiz' | 'results'
  const [quizList, setQuizList] = useState([]);
  const [activeQuizModule, setActiveQuizModule] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setThemePreference(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load quiz summaries on mount
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        setLoading(true);
        const list = await fetchAllQuizSummaries();
        if (isMounted) {
          setQuizList(list);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load quiz summaries:', err);
          setError('Could not load quiz content. Please check that public/essences files exist.');
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectQuiz = async (quizModule) => {
    try {
      setLoading(true);
      setError(null);
      const questions = await loadQuizData(quizModule.filename);
      if (!questions || questions.length === 0) {
        throw new Error('No questions found in this quiz module.');
      }
      setActiveQuizModule(quizModule);
      setActiveQuestions(questions);
      setCurrentView('quiz');
    } catch (err) {
      console.error('Error starting quiz:', err);
      setError(`Failed to load quiz: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteQuiz = (resultData) => {
    setQuizResult(resultData);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartQuiz = () => {
    if (activeQuizModule) {
      handleSelectQuiz(activeQuizModule);
    }
  };

  const handleRestartQuizModule = (quizModule) => {
    clearQuizDraft(quizModule.id);
    handleSelectQuiz(quizModule);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setActiveQuizModule(null);
    setActiveQuestions([]);
    setQuizResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        currentView={currentView}
        onGoHome={handleGoHome}
        activeQuizTitle={activeQuizModule?.title}
      />

      <main className="main-content">
        {loading && (
          <div className="loading-state card">
            <Loader2 size={36} className="spinner" />
            <p>Loading Quiz Content...</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-state card">
            <AlertTriangle size={36} className="icon-danger" />
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleGoHome}>
              Return to Dashboard
            </button>
          </div>
        )}

        {!loading && !error && currentView === 'home' && (
          <HomePage
            quizList={quizList}
            onSelectQuiz={handleSelectQuiz}
            onRestartQuiz={handleRestartQuizModule}
          />
        )}

        {!loading && !error && currentView === 'quiz' && activeQuizModule && (
          <QuizPage
            quizModule={activeQuizModule}
            questions={activeQuestions}
            onCompleteQuiz={handleCompleteQuiz}
            onExit={handleGoHome}
          />
        )}

        {!loading && !error && currentView === 'results' && quizResult && (
          <ResultsPage
            quizResult={quizResult}
            onRestartQuiz={handleRestartQuiz}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <p className="footer-text">Made by <strong>Benedict Avenido</strong></p>
        </div>
      </footer>

      <style>{`
        .loading-state, .error-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          border-radius: var(--radius-xl);
          margin-top: 2rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          color: var(--primary);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .site-footer {
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          padding: 1.25rem 1.5rem;
          margin-top: auto;
          text-align: center;
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-text {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .footer-text strong {
          color: var(--text);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default App;
