import { Code2, PenTool, Timer, ArrowRight } from 'lucide-react';
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
      <td className="num">
        {attempted ? (
          <span className="best">
            <span className="best-track"><i style={{ width: `${score.bestPercentage}%` }} /></span>
            {score.bestPercentage}%
          </span>
        ) : (
          <span className="best-none">Not taken</span>
        )}
      </td>
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
  const solved = Object.keys(lab.solved || {}).length;

  // Best quiz accuracy per module, shown as the bar inside each block
  const modules = OFFICIAL_MODULES.map((mod) => {
    const quizzes = quizList.filter((q) => mod.quizIds.includes(q.id));
    const attempted = quizzes.filter((q) => scores[q.id]?.attempts > 0);
    const accuracy = attempted.length
      ? Math.round(attempted.reduce((sum, q) => sum + (scores[q.id].bestPercentage || 0), 0) / quizzes.length)
      : 0;
    return { ...mod, quizzes, accuracy };
  });
  const mixed = quizList.filter((q) => !OFFICIAL_MODULES.some((m) => m.quizIds.includes(q.id)));
  const weighted = Math.round(modules.reduce((sum, m) => sum + (m.points * m.accuracy) / 100, 0) / 10);

  const practice = [
    {
      id: 'code',
      Icon: Code2,
      title: 'Performance lab',
      detail: 'Python, SQL and calculation problems, checked automatically.',
      status: `${solved} solved`,
    },
    {
      id: 'diagram',
      Icon: PenTool,
      title: 'Diagram lab',
      detail: 'UML, ER diagrams and flow charts with model answers.',
      status: '6 tasks',
    },
    {
      id: 'exam',
      Icon: Timer,
      title: 'Mock exam',
      detail: '65 questions in 150 minutes, scored out of 1,000.',
      status: lastExam ? `Last score ${lastExam.score}` : 'Not taken yet',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-top">
          <div>
            <h1>{TOTAL_POINTS.toLocaleString()} points, four modules</h1>
            <p className="hero-lede">
              The modules are not worth the same. Each block below is as wide as its share of the
              score, so you can see where your study time counts most.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{weighted}%</strong>
              <span>Weighted quiz accuracy</span>
            </div>
            <div className="hero-stat">
              <strong>{lastExam ? lastExam.score : 'None'}</strong>
              <span>{lastExam ? `Last mock exam, level ${levelForScore(lastExam.score).level}` : 'Mock exams taken'}</span>
            </div>
            <div className="hero-stat">
              <strong>{solved}</strong>
              <span>Lab tasks solved</span>
            </div>
          </div>
        </div>

        <div className="score-map-bar" role="img" aria-label="Share of the total score per module">
          {modules.map((m) => (
            <div key={m.id} className="score-map-seg" style={{ flex: m.points, '--seg': m.fill }}>
              <span className="score-map-id">{m.id} <b>{m.title}</b></span>
              <span className="score-map-points">{m.points}</span>
              <span className="score-map-track">
                <span className="score-map-fill" style={{ width: `${m.accuracy}%` }} />
              </span>
            </div>
          ))}
        </div>
        <p className="score-map-note">The white bar in each block is your best quiz accuracy in that module.</p>
      </section>

      <section>
        <h2 className="section-title">Beyond multiple choice</h2>
        <p className="section-lede">
          Multiple choice is 19% of the score. Short answers, written answers and performance tasks make up the other 81%.
        </p>
        <ul className="practice-grid">
          {practice.map(({ id, Icon, title, detail, status }) => (
            <li key={id}>
              <button onClick={() => onNavigate(id)}>
                <span className="practice-icon"><Icon size={21} /></span>
                <span className="practice-title">{title}</span>
                <span className="practice-detail">{detail}</span>
                <span className="practice-status">{status} <ArrowRight size={16} aria-hidden="true" /></span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-title">Question sets</h2>
        <p className="section-lede">Every multiple-choice question explains its answer after you choose.</p>
        {modules.map((m) => (
          <div key={m.id} className="module-block" style={{ '--seg': m.fill }}>
            <header className="module-head">
              <span className="module-tag">{m.id}</span>
              <h3>{m.title}<small>{m.summary}</small></h3>
              <span className="module-points"><strong>{m.points}</strong>points</span>
            </header>
            <QuizTable quizzes={m.quizzes} scores={scores} onSelectQuiz={onSelectQuiz} onRestartQuiz={onRestartQuiz} />
          </div>
        ))}

        {mixed.length > 0 && (
          <div className="module-block" style={{ '--seg': 'var(--text-muted)' }}>
            <header className="module-head">
              <span className="module-tag">All</span>
              <h3>Written answers<small>Descriptive questions you mark against a model answer.</small></h3>
            </header>
            <QuizTable quizzes={mixed} scores={scores} onSelectQuiz={onSelectQuiz} onRestartQuiz={onRestartQuiz} />
          </div>
        )}
      </section>
    </div>
  );
}
