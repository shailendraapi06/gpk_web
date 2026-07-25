function PlacementIcon({ icon }) {
  const icons = {
    support: (
      <path
        d="M12 4L18.5 6.5V11.5C18.5 15 16.1 18.1 12 20C7.9 18.1 5.5 15 5.5 11.5V6.5L12 4ZM9.5 12L11.2 13.7L14.8 10.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    internships: (
      <path
        d="M8 7.5V5.8C8 4.8 8.8 4 9.8 4H14.2C15.2 4 16 4.8 16 5.8V7.5M5.8 7.5H18.2C19.2 7.5 20 8.3 20 9.3V17.2C20 18.2 19.2 19 18.2 19H5.8C4.8 19 4 18.2 4 17.2V9.3C4 8.3 4.8 7.5 5.8 7.5ZM10 12H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    guidance: (
      <path
        d="M12 19C15.9 19 19 15.9 19 12C19 8.1 15.9 5 12 5C8.1 5 5 8.1 5 12C5 15.9 8.1 19 12 19ZM12 9.5V12L14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    collaboration: (
      <path
        d="M8.5 9.5L11 12L8.5 14.5M15.5 9.5L13 12L15.5 14.5M10 18H7.8C6.8 18 6 17.2 6 16.2V7.8C6 6.8 6.8 6 7.8 6H10M14 6H16.2C17.2 6 18 6.8 18 7.8V16.2C18 17.2 17.2 18 16.2 18H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  };

  return (
    <span className="placement-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        {icons[icon] || icons.support}
      </svg>
    </span>
  );
}

export function PlacementCard({ title, description, icon }) {
  return (
    <article className="placement-card surface">
      <PlacementIcon icon={icon} />
      <div className="placement-card__content">
        <h3 className="placement-card__title">{title}</h3>
        <p className="placement-card__description">{description}</p>
      </div>
    </article>
  );
}
