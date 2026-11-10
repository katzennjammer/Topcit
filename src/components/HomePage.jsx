import { ChevronRight } from 'lucide-react';
import { getQuizScores, getQuizDraft, loadJSON, LAB_KEYS } from '../utils/storage';
import { OFFICIAL_MODULES, TOTAL_POINTS, levelForScore } from '../data/modules';

function QuizRow({ quiz, score, onSelectQuiz, onRestartQuiz }) {
  const draft = getQuizDraft(quiz.id);
  const answered = Object.keys(draft?.userAnswers || {}).length;
  const hasDraft = Boolean(draft && (answered > 0 || draft.currentIndex > 0));
  const attempted = Boolean(score && score.attempts > 0);

  return (
    <tr>
      <td className="quiz-name">
        <strong>{quiz.title}</strong>
        <span>{quiz.description}</span>
      </td>
      <td className="num">{quiz.questionCount || 0}</td>
      <td className="num">{attempted ? `${score.bestPercentage}%` : 'Not taken'}</td>
      <td className="quiz-actions">
        {hasDraft ? (
          <>
            <button className="btn btn-primary" onClick={() => onSelectQuiz(quiz)}>
              Continue ({answered}/{quiz.questionCount})
            </button>
            <button className="btn btn-outline" onClick={() => onRestartQuiz(quiz)}>Restart</button>
          </>
        ) : (
          <button className={`btn ${attempted ? 'btn-outline' : 'btn-primary'}`} onClick={() => onSelectQuiz(quiz)}>
            {attempted ? 'Retake' : 'Start'}
          </button>
        )}
      </td>
    </tr>
  );
}

function QuizTable({ quizzes, scores, onSelectQuiz, onRestartQuiz }) {
  return (
    <div className="table-scroll">
      <table className="quiz-table">
        <thead>
          <tr>
            <th>Question set</th>
            <th className="num">Questions</th>
            <th className="num">Best score</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <QuizRow
              key={quiz.id}
              quiz={quiz}
              score={scores[quiz.id]}
              onSelectQuiz={onSelectQuiz}
              onRestartQuiz={onRestartQuiz}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HomePage({ quizList, onSelectQuiz, onRestartQuiz, onNavigate }) {
  const scores = getQuizScores();
  const examHistory = loadJSON(LAB_KEYS.EXAM_HISTORY, []);
  const lab = loadJSON(LAB_KEYS.CODE, { solved: {} });
  const lastExam = examHistory[0];

  // Best quiz accuracy per module, used to shade the score map
  const modules = OFFICIAL_MODULES.map((mod) => {
    const quizzes = quizList.filter((q) => mod.quizIds.includes(q.id));
    const attempted = quizzes.filter((q) => scores[q.id]?.attempts > 0);
    const accuracy = attempted.length
      ? Math.round(attempted.reduce((sum, q) => sum + (scores[q.id].bestPercentage || 0), 0) / quizzes.length)
      : 0;
    return { ...mod, quizzes, accuracy, started: attempted.length > 0 };
  });
  const mixed = quizList.filter((q) => !OFFICIAL_MODULES.some((m) => m.quizIds.includes(q.id)));

  const practice = [
    {
      id: 'code',
      title: 'Performance lab',
      detail: 'Python, SQL and calculation problems, checked automatically',
      status: `${Object.keys(lab.solved || {}).length} solved`,
    },
    {
      id: 'diagram',
      title: 'Diagram lab',
      detail: 'UML, ER diagrams and flow charts with model answers',
      status: '6 tasks',
    },
    {
      id: 'exam',
      title: 'Mock exam',
      detail: '65 questions, 150 minutes, scored out of 1,000',
      status: lastExam ? `Last score ${lastExam.score} (level ${levelForScore(lastExam.score).level})` : 'Not taken',
    },
  ];

  return (
    <div className="home-page">
      <section className="score-map">
        <header className="page-head">
          <h1>Dashboard</h1>
          <p>
            TOPCIT is scored out of {TOTAL_POINTS.toLocaleString()} points across four modules. Each block
            is as wide as its module's share of the score; the shaded part is your best quiz accuracy there.
          </p>
        </header>

        <div className="score-map-bar" role="img" aria-label="Share of the total score per module">
          {modules.map((m) => (
            <div key={m.id} className="score-map-seg" style={{ flex: m.points, '--seg': m.color }}>
              <span className="score-map-fill" style={{ width: `${m.accuracy}%` }} />
              <span className="score-map-id">{m.id}</span>
              <span className="score-map-points">{m.points}</span>
            </div>
          ))}
        </div>

        <table className="plain-table module-table">
          <thead>
            <tr><th>Module</th><th>Points</th><th>Share</th><th>Quiz accuracy</th></tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <tr key={m.id}>
                <td>
                  <span className="legend-swatch" style={{ background: m.color }} />
                  {m.id} {m.title}
                </td>
                <td>{m.points}</td>
                <td>{(m.points / 10).toFixed(1)}%</td>
                <td>{m.started ? `${m.accuracy}%` : 'Not started'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="section-title">Beyond multiple choice</h2>
        <p className="section-lede">
          Multiple choice is 19% of the score. Short answers, written answers and performance tasks make up the other 81%.
        </p>
        <ul className="practice-list">
          {practice.map((item) => (
            <li key={item.id}>
              <button onClick={() => onNavigate(item.id)}>
                <span className="practice-title">{item.title}</span>
                <span className="practice-detail">{item.detail}</span>
                <span className="practice-status">{item.status}</span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-title">Question sets by module</h2>
        {modules.map((m) => (
          <div key={m.id} className="module-block" style={{ '--seg': m.color }}>
            <header className="module-head">
              <h3><span className="module-id">{m.id}</span> {m.title}</h3>
              <span className="module-points">{m.points} points</span>
            </header>
            <QuizTable quizzes={m.quizzes} scores={scores} onSelectQuiz={onSelectQuiz} onRestartQuiz={onRestartQuiz} />
          </div>
        ))}

        {mixed.length > 0 && (
          <div className="module-block" style={{ '--seg': 'var(--text-muted)' }}>
            <header className="module-head">
              <h3>Written answers, all modules</h3>
            </header>
            <QuizTable quizzes={mixed} scores={scores} onSelectQuiz={onSelectQuiz} onRestartQuiz={onRestartQuiz} />
          </div>
        )}
      </section>
    </div>
  );
}
