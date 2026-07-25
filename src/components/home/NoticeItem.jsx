export function NoticeItem({ title, description, publishDate, isNew, actionLabel, actionHref }) {
  return (
    <article className="notice-item">
      <div className="notice-item__content">
        <div className="notice-item__meta">
          <p className="notice-item__date">{publishDate}</p>
          {isNew ? <span className="notice-item__badge">New</span> : null}
        </div>
        <h3 className="notice-item__title">{title}</h3>
        <p className="notice-item__description">{description}</p>
      </div>

      <a className="notice-item__action" href={actionHref}>
        {actionLabel}
      </a>
    </article>
  );
}
