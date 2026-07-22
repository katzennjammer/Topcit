import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  AlertCircle,
  Award,
  RotateCcw
} from 'lucide-react';
import { saveQuizDraft, getQuizDraft, clearQuizDraft } from '../utils/storage';

export function QuizPage({ quizModule, questions, onCompleteQuiz, onExit }) {
  // Restore draft if exists
  const initialDraft = useMemo(() => getQuizDraft(quizModule.id), [quizModule.id]);

  const [currentIndex, setCurrentIndex] = useState(initialDraft?.currentIndex || 0);
  const [userAnswers, setUserAnswers] = useState(initialDraft?.userAnswers || {});
  const [flagged, setFlagged] = useState(initialDraft?.flagged || {});
  const [timeSeconds, setTimeSeconds] = useState(initialDraft?.timeSeconds || 0);
  const [showTimer, setShowTimer] = useState(true);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Timer Tick
  useEffect(() => {
    if (isTimerPaused) return;
    const interval = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPaused]);

  // Draft auto-save
  useEffect(() => {
    saveQuizDraft(quizModule.id, {
      currentIndex,
      userAnswers,
      flagged,
      timeSeconds,
    });
  }, [quizModule.id, currentIndex, userAnswers, flagged, timeSeconds]);

  const handleSelectChoice = (choiceIndex) => {
    // If an answer has already been cast for this question, prevent changing it
    if (userAnswers[currentIndex] !== undefined) return;
    
    // Save answer for current question
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: choiceIndex,
    }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = useCallback(() => {
    clearQuizDraft(quizModule.id);
    onCompleteQuiz({
      quizId: quizModule.id,
      quizTitle: quizModule.title,
      questions,
      userAnswers,
      timeSeconds,
      flagged,
    });
  }, [quizModule, questions, userAnswers, timeSeconds, flagged, onCompleteQuiz]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showConfirmSubmit) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'n') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'p') {
        handlePrev();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const choiceIdx = parseInt(e.key, 10) - 1;
        if (currentQuestion && choiceIdx < currentQuestion.choices.length) {
          handleSelectChoice(choiceIdx);
        }
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const choiceIdx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (currentQuestion && choiceIdx < currentQuestion.choices.length) {
          handleSelectChoice(choiceIdx);
        }
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, currentQuestion, showConfirmSubmit]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return (
      <div className="card empty-quiz">
        <p>No question data available.</p>
        <button className="btn btn-primary" onClick={onExit}>Return Home</button>
      </div>
    );
  }

  const selectedChoiceIdx = userAnswers[currentIndex];
  const hasAnswered = selectedChoiceIdx !== undefined;
  const isCorrect = hasAnswered && selectedChoiceIdx === currentQuestion.correctIndex;

  return (
    <div className="quiz-page animate-fade-in">
      {/* Top Controls Header */}
      <div className="quiz-header-bar card">
        <div className="quiz-header-left">
          <button className="btn btn-outline exit-btn" onClick={onExit} title="Exit Quiz">
            <ArrowLeft size={18} />
            <span className="btn-text">Exit</span>
          </button>

          <div className="quiz-header-info">
            <h2 className="quiz-header-title">{quizModule.title}</h2>
            <span className="question-counter">
              Question <strong>{currentIndex + 1}</strong> of <strong>{totalQuestions}</strong>
            </span>
          </div>
        </div>

        <div className="quiz-header-right">
          {/* Timer toggle */}
          <div className="timer-box" title="Time Elapsed">
            <Clock size={16} className="timer-icon" />
            <span className="timer-value">{showTimer ? formatTime(timeSeconds) : '••:••'}</span>
            <button
              className="timer-toggle-btn"
              onClick={() => setShowTimer(!showTimer)}
              title={showTimer ? 'Hide Timer' : 'Show Timer'}
            >
              {showTimer ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          <button
            className={`flag-btn ${flagged[currentIndex] ? 'flagged' : ''}`}
            onClick={toggleFlag}
            title={flagged[currentIndex] ? 'Unflag Question' : 'Flag Question for Review'}
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="question-card card">
        <div className="question-card-header">
          <span className="q-number-badge">Q{currentIndex + 1}</span>
          {flagged[currentIndex] && (
            <span className="flagged-tag">
              <Bookmark size={12} /> Flagged
            </span>
          )}
        </div>

        <h3 className="question-text">{currentQuestion.question}</h3>

        {/* Choices Grid */}
        <div className="choices-list">
          {currentQuestion.choices.map((choiceText, idx) => {
            const isSelected = selectedChoiceIdx === idx;
            const isChoiceCorrect = idx === currentQuestion.correctIndex;

            let optionStateClass = '';
            if (hasAnswered) {
              if (isChoiceCorrect) {
                optionStateClass = 'correct-choice';
              } else if (isSelected && !isChoiceCorrect) {
                optionStateClass = 'incorrect-choice';
              } else {
                optionStateClass = 'muted-choice';
              }
            }

            const letterLabel = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                className={`choice-button ${optionStateClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectChoice(idx)}
                disabled={hasAnswered}
                aria-label={`Option ${letterLabel}: ${choiceText}`}
              >
                <div className="choice-letter">{letterLabel}</div>
                <div className="choice-text">{choiceText}</div>

                {hasAnswered && (
                  <div className="choice-feedback-icon">
                    {isChoiceCorrect && <CheckCircle2 size={20} className="icon-success" />}
                    {isSelected && !isChoiceCorrect && <XCircle size={20} className="icon-danger" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback Explanation Banner */}
        {hasAnswered && (
          <div className={`feedback-banner ${isCorrect ? 'correct' : 'incorrect'} animate-fade-in`}>
            <div className="feedback-banner-header">
              {isCorrect ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Correct Answer! Well done.</span>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <span>Incorrect. The correct choice is option {String.fromCharCode(65 + currentQuestion.correctIndex)}.</span>
                </>
              )}
            </div>

            {currentQuestion.explanation && (
              <p className="explanation-text">{currentQuestion.explanation}</p>
            )}
          </div>
        )}
      </div>

      {/* Question Jumper Grid */}
      <div className="question-jumper-bar card">
        <span className="jumper-label">Question Map:</span>
        <div className="jumper-grid">
          {questions.map((_, qIdx) => {
            const isCurrent = qIdx === currentIndex;
            const isAns = userAnswers[qIdx] !== undefined;
            const isFlg = flagged[qIdx];
            
            let statusClass = '';
            if (isAns) {
              const qObj = questions[qIdx];
              statusClass = userAnswers[qIdx] === qObj.correctIndex ? 'ans-correct' : 'ans-incorrect';
            }

            return (
              <button
                key={qIdx}
                className={`jumper-dot ${isCurrent ? 'active' : ''} ${statusClass} ${isFlg ? 'has-flag' : ''}`}
                onClick={() => setCurrentIndex(qIdx)}
                title={`Go to Question ${qIdx + 1}`}
              >
                {qIdx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="quiz-navigation-bar">
        <button
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={16} /> Previous
        </button>

        <div className="nav-center-info">
          <span>{answeredCount} of {totalQuestions} Answered</span>
        </div>

        {currentIndex === totalQuestions - 1 ? (
          <button
            className="btn btn-primary submit-btn"
            onClick={() => setShowConfirmSubmit(true)}
          >
            <Award size={16} /> Submit Quiz
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="modal-overlay" onClick={() => setShowConfirmSubmit(false)}>
          <div className="modal-content card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <AlertCircle size={24} className="icon-warning" />
                <h3>Ready to Finish?</h3>
              </div>
              <button className="close-btn" onClick={() => setShowConfirmSubmit(false)}>&times;</button>
            </div>

            <div className="confirm-body">
              <p>You have answered <strong>{answeredCount}</strong> out of <strong>{totalQuestions}</strong> questions.</p>
              {answeredCount < totalQuestions && (
                <p className="unanswered-warning">
                  ⚠️ You still have {totalQuestions - answeredCount} unanswered question(s).
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowConfirmSubmit(false)}>
                Continue Answering
              </button>
              <button className="btn btn-primary" onClick={handleSubmitQuiz}>
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .quiz-page {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .quiz-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          gap: 1rem;
        }

        .quiz-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .exit-btn {
          padding: 0.5rem 0.85rem;
        }

        .quiz-header-title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .question-counter {
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .quiz-header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .timer-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--background);
          border: 1px solid var(--border);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
        }

        .timer-toggle-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .timer-toggle-btn:hover {
          color: var(--text);
        }

        .flag-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background-color: var(--background);
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .flag-btn:hover {
          border-color: var(--warning);
          color: var(--warning);
        }

        .flag-btn.flagged {
          background-color: var(--warning-bg);
          border-color: var(--warning);
          color: var(--warning);
        }

        .progress-bar-container {
          width: 100%;
          height: 6px;
          background-color: var(--border);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width var(--transition-normal);
        }

        .question-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background-color: var(--surface);
          border-radius: var(--radius-xl);
        }

        .question-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .q-number-badge {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .flagged-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--warning);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .question-text {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.45;
          color: var(--text);
        }

        .choices-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .choice-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          background-color: var(--surface);
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          text-align: left;
          font-family: var(--font-sans);
          font-size: 0.975rem;
          color: var(--text);
          transition: all var(--transition-fast);
          position: relative;
        }

        .choice-button:hover:not(:disabled):not(.correct-choice):not(.incorrect-choice) {
          border-color: var(--primary);
          background-color: var(--surface-hover);
          transform: translateX(4px);
        }

        .choice-button:disabled {
          cursor: not-allowed;
          transform: none !important;
        }

        .choice-button.selected {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }

        .choice-button.correct-choice {
          border-color: var(--success);
          background-color: var(--success-bg);
          color: var(--text);
        }

        .choice-button.incorrect-choice {
          border-color: var(--danger);
          background-color: var(--danger-bg);
          color: var(--text);
        }

        .choice-button.muted-choice {
          opacity: 0.6;
        }

        .choice-letter {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background-color: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .choice-button.selected .choice-letter {
          background-color: var(--primary);
          color: #FFFFFF;
        }

        .choice-button.correct-choice .choice-letter {
          background-color: var(--success);
          color: #FFFFFF;
        }

        .choice-button.incorrect-choice .choice-letter {
          background-color: var(--danger);
          color: #FFFFFF;
        }

        .choice-text {
          flex: 1;
          line-height: 1.4;
          font-weight: 500;
        }

        .choice-feedback-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .icon-success {
          color: var(--success);
        }

        .icon-danger {
          color: var(--danger);
        }

        .feedback-banner {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .feedback-banner.correct {
          background-color: var(--success-bg);
          border: 1px solid var(--success-border);
          color: var(--text);
        }

        .feedback-banner.incorrect {
          background-color: var(--danger-bg);
          border: 1px solid var(--danger-border);
          color: var(--text);
        }

        .feedback-banner-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .explanation-text {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .question-jumper-bar {
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
        }

        .jumper-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .jumper-grid {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }

        .jumper-dot {
          min-width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background-color: var(--background);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .jumper-dot:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .jumper-dot.active {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-light);
          font-weight: 800;
        }

        .jumper-dot.ans-correct {
          background-color: var(--success);
          color: #FFFFFF;
          border-color: var(--success);
        }

        .jumper-dot.ans-incorrect {
          background-color: var(--danger);
          color: #FFFFFF;
          border-color: var(--danger);
        }

        .jumper-dot.has-flag {
          border-color: var(--warning) !important;
        }

        .quiz-navigation-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .nav-center-info {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .confirm-body {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .unanswered-warning {
          color: var(--warning);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .icon-warning {
          color: var(--warning);
        }

        @media (max-width: 640px) {
          .question-card {
            padding: 1.25rem;
          }

          .question-text {
            font-size: 1.1rem;
          }

          .quiz-header-bar {
            padding: 0.85rem 1rem;
          }

          .btn-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
