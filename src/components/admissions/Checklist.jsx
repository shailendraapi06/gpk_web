export function Checklist({ items, columns = 1, className = "" }) {
  const classes = [
    "admissions-checklist",
    columns === 2 ? "admissions-checklist--two-column" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={classes} role="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
