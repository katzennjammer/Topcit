/** Self-grading checklist: tick the elements your answer contains. */
export function Checklist({ items, checked = [], onChange, idPrefix }) {
  const toggle = (i) => {
    const next = checked.includes(i) ? checked.filter((x) => x !== i) : [...checked, i];
    onChange(next);
  };
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={i}>
          <label htmlFor={`${idPrefix}-${i}`}>
            <input
              id={`${idPrefix}-${i}`}
              type="checkbox"
              checked={checked.includes(i)}
              onChange={() => toggle(i)}
            />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
