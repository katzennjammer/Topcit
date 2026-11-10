import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { ReviewersPage } from './components/ReviewersPage';
import { CodeLabPage } from './components/CodeLabPage';
import { DiagramLabPage } from './components/DiagramLabPage';
import { ExamPage } from './components/ExamPage';
import { fetchAllQuizSummaries, loadQuizData, randomizeQuiz } from './utils/quizLoader';
import { getThemePreference, setThemePreference, clearQuizDraft, getQuizDraft } from './utils/storage';
import { Loader2, AlertTriangle } from 'lucide-react';
import './styles/app.css';

export function App() {
  const [theme, setTheme] = useState(getThemePreference);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'quiz' | 'results'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'code' | 'diagram' | 'exam' | 'reviewers'
  const [activeReviewerId, setActiveReviewerId] = useState('Essence 1');
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
      let questions = await loadQuizData(quizModule.filePath || quizModule.filename);
      if (!questions || questions.length === 0) {
        throw new Error('No questions found in this quiz module.');
      }

      const existingDraft = getQuizDraft(quizModule.id);
      if (!existingDraft) {
        questions = randomizeQuiz(questions);
      } else if (existingDraft.questions && existingDraft.questions.length > 0) {
        questions = existingDraft.questions;
      } else {
        questions = randomizeQuiz(questions);
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

  const handleStartQuizByEssenceId = (essenceId) => {
    const targetQuiz = quizList.find((q) => q.id === essenceId);
    if (targetQuiz) {
      handleSelectQuiz(targetQuiz);
    }
  };

  const handleCompleteQuiz = (resultData) => {
    setQuizResult({ ...resultData, isPractice: Boolean(activeQuizModule?.isPractice) });
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartQuiz = () => {
    if (activeQuizModule) {
      handleSelectQuiz(activeQuizModule.baseModule || activeQuizModule);
    }
  };

  // Start a practice round containing only the questions the user got wrong
  const handleRetryMissed = (missedQuestions) => {
    if (!activeQuizModule || !missedQuestions || missedQuestions.length === 0) return;
    const baseModule = activeQuizModule.baseModule || activeQuizModule;
    const retryModule = {
      ...baseModule,
      id: `${baseModule.id}__retry`,
      title: `${baseModule.title} (Missed Questions)`,
      isPractice: true,
      baseModule,
    };
    clearQuizDraft(retryModule.id);
    setActiveQuizModule(retryModule);
    setActiveQuestions(randomizeQuiz(missedQuestions));
    setQuizResult(null);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Sidebar
        active={activeTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (currentView !== 'home') {
            handleGoHome();
          }
          window.scrollTo({ top: 0 });
        }}
      />

      <main className="main-content">
        {loading && (
          <div className="loading-state card">
            <Loader2 size={36} className="spinner" />
            <p>Loading</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-state card">
            <AlertTriangle size={36} className="icon-danger" />
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleGoHome}>
              Back to dashboard
            </button>
          </div>
        )}

        {!loading && !error && currentView === 'home' && activeTab === 'dashboard' && (
          <HomePage
            quizList={quizList}
            onSelectQuiz={handleSelectQuiz}
            onRestartQuiz={handleRestartQuizModule}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0 });
            }}
          />
        )}

        {!loading && !error && currentView === 'home' && activeTab === 'reviewers' && (
          <ReviewersPage
            activeReviewerId={activeReviewerId}
            onSelectReviewer={(id) => setActiveReviewerId(id)}
            onStartQuizForModule={handleStartQuizByEssenceId}
          />
        )}

        {!loading && !error && currentView === 'home' && activeTab === 'code' && <CodeLabPage />}

        {!loading && !error && currentView === 'home' && activeTab === 'diagram' && <DiagramLabPage theme={theme} />}

        {!loading && !error && currentView === 'home' && activeTab === 'exam' && <ExamPage theme={theme} />}

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
            onRetryMissed={handleRetryMissed}
            onGoHome={handleGoHome}
          />
        )}
      </main>

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
      `}</style>
    </div>
  );
}

export default App;
