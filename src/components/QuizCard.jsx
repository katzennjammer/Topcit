import React from 'react';
import { 
  Code, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  CheckSquare, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { getQuizScores, getQuizDraft } from '../utils/storage';

const ICON_MAP = {
  Code,
  Database,
  Cpu,
  ShieldCheck,
  Briefcase,
  CheckSquare,
};

export function QuizCard({ quiz, onSelectQuiz, onRestartQuiz }) {
  const scores = getQuizScores()[quiz.id];
  const draft = getQuizDraft(quiz.id);
  const IconComponent = ICON_MAP[quiz.iconName] || HelpCircle;

  const answeredCount = Object.keys(draft?.userAnswers || {}).length;
  const hasDraft = Boolean(draft && (answeredCount > 0 || (draft.currentIndex && draft.currentIndex > 0)));
  const hasHistory = Boolean(scores && scores.attempts > 0);

  return (
    <div className="quiz-card card animate-fade-in">
      <div className="quiz-card-header">
        <div 
          className="quiz-icon-wrapper" 
          style={{ backgroundColor: quiz.accentLight, color: quiz.color }}
        >
          <IconComponent size={24} />
        </div>
        
        <div className="quiz-card-meta">
          <span className="quiz-category-badge">{quiz.category}</span>
          <span className="quiz-module-id">{quiz.id}</span>
        </div>
      </div>

      <div className="quiz-card-body">
        <h3 className="quiz-title">{quiz.title}</h3>
        <p className="quiz-description">{quiz.description}</p>
      </div>

      <div className="quiz-card-footer">
        <div className="quiz-stats-group">
          <div className="stat-pill" title="Total Questions">
            <HelpCircle size={14} />
            <span>{quiz.questionCount || 0} Qs</span>
          </div>

          {hasHistory && (
            <div className="stat-pill best-score" title="Best Attempt Score">
              <CheckCircle2 size={14} />
              <span>Best: {scores.bestScore}/{quiz.questionCount} ({scores.bestPercentage}%)</span>
            </div>
          )}

          {hasDraft && (
            <div className="stat-pill draft-pill" title="Progress Saved">
              <span>{answeredCount}/{quiz.questionCount} answered</span>
            </div>
          )}
        </div>

        <div className="button-group">
          {hasDraft ? (
            <>
              <button 
                className="btn btn-primary continue-btn" 
                onClick={() => onSelectQuiz(quiz)}
              >
                <Play size={16} /> Continue
              </button>
              <button 
                className="btn btn-outline restart-btn" 
                onClick={() => onRestartQuiz(quiz)}
                title="Restart this quiz from the beginning"
              >
                <RotateCcw size={16} /> Restart
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary start-btn" 
              onClick={() => onSelectQuiz(quiz)}
            >
              {hasHistory ? (
                <>
                  <Play size={16} /> Retake Quiz
                </>
              ) : (
                <>
                  Start Quiz <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .quiz-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          height: 100%;
          position: relative;
          background-color: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          transition: all var(--transition-normal);
        }

        .quiz-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-focus);
          box-shadow: var(--shadow-lg);
        }

        .quiz-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .quiz-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-fast);
        }

        .quiz-card:hover .quiz-icon-wrapper {
          transform: scale(1.08);
        }

        .quiz-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quiz-category-badge {
          font-size: 0.725rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background-color: var(--background);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .quiz-module-id {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .quiz-card-body {
          flex: 1;
          margin-bottom: 1.25rem;
        }

        .quiz-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .quiz-description {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .quiz-card-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px dashed var(--border);
        }

        .quiz-stats-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          background-color: var(--background);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .stat-pill.best-score {
          color: var(--success);
          background-color: var(--success-bg);
        }

        .stat-pill.draft-pill {
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .button-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .continue-btn {
          flex: 1;
        }

        .start-btn {
          width: 100%;
        }

        .restart-btn {
          padding: 0.75rem 0.85rem;
        }
      `}</style>
    </div>
  );
}
