import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter, 
  Bookmark, 
  Sparkles,
  ArrowRight,
  Target
} from 'lucide-react';
import { saveQuizResult } from '../utils/storage';

export function ResultsPage({ quizResult, onRestartQuiz, onRetryMissed, onGoHome }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'flagged'

  const { quizId, quizTitle, questions, userAnswers, timeSeconds, flagged = {}, isPractice = false } = quizResult;

  const totalQuestions = questions.length;
  const correctCount = questions.reduce((acc, q, idx) => {
    const ans = userAnswers[idx];
    if (q.isDescriptive) {
      return (ans && typeof ans === 'object' && ans.isCorrect) ? acc + 1 : acc;
    }
    return ans === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const incorrectCount = totalQuestions - correctCount;

  // Questions answered wrong or left blank, used for the "retry missed" round
  const missedQuestions = questions.filter((q, idx) => {
    const ans = userAnswers[idx];
    if (q.isDescriptive) return !(ans && typeof ans === 'object' && ans.isCorrect);
    return ans !== q.correctIndex;
  });
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Trigger confetti if high score
  useEffect(() => {
    // Practice rounds on missed questions don't count toward saved scores
    if (!isPractice) {
      saveQuizResult(quizId, {
        score: correctCount,
        total: totalQuestions,
        timeSeconds,
      });
    }

    if (percentage >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.log('Confetti effect failed', e);
      }
    }
  }, [quizId, correctCount, totalQuestions, timeSeconds, percentage, isPractice]);

  const filteredQuestions = questions.map((q, idx) => {
    const ans = userAnswers[idx];
    let isCorrect = false;
    if (q.isDescriptive) {
      isCorrect = Boolean(ans && typeof ans === 'object' && ans.isCorrect);
    } else {
      isCorrect = ans === q.correctIndex;
    }

    return {
      ...q,
      originalIndex: idx,
      userAnswerVal: ans,
      isCorrect,
      isFlagged: Boolean(flagged[idx]),
    };
  }).filter((item) => {
    if (filterMode === 'correct') return item.isCorrect;
    if (filterMode === 'incorrect') return !item.isCorrect;
    if (filterMode === 'flagged') return item.isFlagged;
    return true;
  });

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const getPerformanceTag = () => {
    if (percentage >= 90) return { label: 'Outstanding!', color: '#10B981', bg: '#ECFDF5' };
    if (percentage >= 75) return { label: 'Great Job!', color: '#4F46E5', bg: '#EEF2FF' };
    if (percentage >= 50) return { label: 'Good Effort!', color: '#D97706', bg: '#FEF3C7' };
    return { label: 'Keep Practicing', color: '#EF4444', bg: '#FEF2F2' };
  };

  const perf = getPerformanceTag();

  return (
    <div className="results-page animate-fade-in">
      {/* Celebration Header Card */}
      <div className="results-hero card">
        <div className="results-badge-wrapper" style={{ backgroundColor: perf.bg, color: perf.color }}>
          <Trophy size={28} />
        </div>

        <h1 className="results-title">{perf.label}</h1>
        <p className="results-subtitle">You completed <strong>{quizTitle}</strong></p>

        {/* Score metrics */}
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-value">{correctCount} / {totalQuestions}</span>
            <span className="metric-label">Score</span>
          </div>

          <div className="metric-box">
            <span className="metric-value">{percentage}%</span>
            <span className="metric-label">Accuracy</span>
          </div>

          <div className="metric-box">
            <span className="metric-value">{formatTime(timeSeconds)}</span>
            <span className="metric-label">Time Spent</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          {missedQuestions.length > 0 && onRetryMissed && (
            <button className="btn btn-primary" onClick={() => onRetryMissed(missedQuestions)}>
              <Target size={18} /> Retry {missedQuestions.length} Missed
            </button>
          )}
          <button
            className={`btn ${missedQuestions.length > 0 ? 'btn-outline' : 'btn-primary'}`}
            onClick={onRestartQuiz}
          >
            <RotateCcw size={18} /> {isPractice ? 'Retake Full Quiz' : 'Retake Quiz'}
          </button>
          <button className="btn btn-outline" onClick={onGoHome}>
            <Home size={18} /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* Detailed Review Section */}
      <div className="review-section card">
        <div className="review-header">
          <div className="review-title-group">
            <Sparkles size={20} className="icon-primary" />
            <h3>Question Review Mode</h3>
          </div>

          {/* Filter Pills */}
          <div className="review-filter-pills">
            <button
              className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => setFilterMode('all')}
            >
              All ({totalQuestions})
            </button>

            <button
              className={`filter-pill ${filterMode === 'correct' ? 'active' : ''}`}
              onClick={() => setFilterMode('correct')}
            >
              <CheckCircle2 size={14} className="icon-success" /> Correct ({correctCount})
            </button>

            <button
              className={`filter-pill ${filterMode === 'incorrect' ? 'active' : ''}`}
              onClick={() => setFilterMode('incorrect')}
            >
              <XCircle size={14} className="icon-danger" /> Incorrect ({incorrectCount})
            </button>

            <button
              className={`filter-pill ${filterMode === 'flagged' ? 'active' : ''}`}
              onClick={() => setFilterMode('flagged')}
            >
              <Bookmark size={14} /> Flagged ({Object.values(flagged).filter(Boolean).length})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="review-questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              return (
                <div key={q.originalIndex} className="review-item-card">
                  <div className="review-item-header">
                    <div className="review-item-title-group">
                      <span className="q-badge">Q{q.originalIndex + 1}</span>
                      {q.isDescriptive && (
                        <span className="type-badge-sm">Descriptive</span>
                      )}
                      {q.isCorrect ? (
                        <span className="status-badge success">
                          <CheckCircle2 size={14} /> Correct
                        </span>
                      ) : (
                        <span className="status-badge danger">
                          <XCircle size={14} /> Incorrect
                        </span>
                      )}
                      {q.isFlagged && (
                        <span className="status-badge warning">
                          <Bookmark size={14} /> Flagged
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="review-q-text">{q.question}</h4>

                  {q.code && (
                    <pre className="code-snippet-box">
                      <code>{q.code}</code>
                    </pre>
                  )}

                  {q.isDescriptive ? (
                    <div className="review-descriptive-grid">
                      <div className="review-descriptive-box user">
                        <span className="box-label">Your Submitted Answer:</span>
                        <p>{typeof q.userAnswerVal === 'object' ? q.userAnswerVal.text : (q.userAnswerVal || '(No answer text submitted)')}</p>
                      </div>
                      <div className="review-descriptive-box reference">
                        <span className="box-label highlight">Reference Model Answer:</span>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="review-choices-grid">
                      {q.choices.map((choiceText, cIdx) => {
                        const isUserChoice = q.userAnswerVal === cIdx;
                        const isCorrectChoice = cIdx === q.correctIndex;

                        let choiceClass = '';
                        if (isCorrectChoice) choiceClass = 'correct';
                        else if (isUserChoice && !isCorrectChoice) choiceClass = 'incorrect';

                        return (
                          <div key={cIdx} className={`review-choice-box ${choiceClass}`}>
                            <span className="choice-label">{String.fromCharCode(65 + cIdx)}</span>
                            <span className="choice-val">{choiceText}</span>
                            {isCorrectChoice && <span className="tag-correct">Correct Answer</span>}
                            {isUserChoice && !isCorrectChoice && <span className="tag-user">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.explanation && (
                    <div className="review-explanation">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="empty-review">
              <p>No questions match the current filter.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .results-page {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .results-hero {
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          background: linear-gradient(135deg, var(--surface), var(--background));
          border-radius: var(--radius-xl);
        }

        .results-badge-wrapper {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }

        .results-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .results-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 540px;
          margin-top: 0.5rem;
        }

        .metric-box {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.25rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .metric-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .results-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }

        .review-section {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-radius: var(--radius-xl);
        }

        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border);
        }

        .review-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .review-title-group h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .review-filter-pills {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          overflow-x: auto;
        }

        .filter-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background-color: var(--background);
          border: 1px solid var(--border);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-pill.active {
          background-color: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
        }

        .review-questions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-item-card {
          background-color: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .review-item-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .q-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .type-badge-sm {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--secondary);
          background-color: var(--secondary-light);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .status-badge.success {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .status-badge.danger {
          background-color: var(--danger-bg);
          color: var(--danger);
        }

        .status-badge.warning {
          background-color: var(--warning-bg);
          color: var(--warning);
        }

        .review-q-text {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .code-snippet-box {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          font-family: monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--text);
          line-height: 1.5;
        }

        .review-descriptive-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .review-descriptive-box {
          padding: 1rem;
          border-radius: var(--radius-md);
          background-color: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.925rem;
        }

        .review-descriptive-box.reference {
          border-left: 3px solid var(--primary);
        }

        .box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }

        .box-label.highlight {
          color: var(--primary);
        }

        .review-choices-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .review-choice-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
        }

        .review-choice-box.correct {
          border-color: var(--success);
          background-color: var(--success-bg);
          font-weight: 600;
        }

        .review-choice-box.incorrect {
          border-color: var(--danger);
          background-color: var(--danger-bg);
        }

        .choice-label {
          font-weight: 700;
          color: var(--text-muted);
          width: 20px;
        }

        .choice-val {
          flex: 1;
        }

        .tag-correct {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--success);
          text-transform: uppercase;
        }

        .tag-user {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--danger);
          text-transform: uppercase;
        }

        .review-explanation {
          font-size: 0.875rem;
          color: var(--text-muted);
          background-color: var(--surface);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border-left: 3px solid var(--primary);
        }

        .empty-review {
          text-align: center;
          padding: 2rem;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .results-actions {
            flex-direction: column;
            width: 100%;
          }

          .results-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
