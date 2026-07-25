import { NavLink } from "react-router-dom";

function DepartmentIcon({ icon }) {
  const icons = {
    computer: (
      <path
        d="M5 7.5C5 6.4 5.9 5.5 7 5.5H17C18.1 5.5 19 6.4 19 7.5V14.5C19 15.6 18.1 16.5 17 16.5H13.5L14.5 19H9.5L10.5 16.5H7C5.9 16.5 5 15.6 5 14.5V7.5ZM8 9.5H16M8 12.5H12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    mechanical: (
      <path
        d="M12 6.5L13.8 8.3L16.5 7.5L17.3 10.2L20 12L17.3 13.8L16.5 16.5L13.8 15.7L12 17.5L10.2 15.7L7.5 16.5L6.7 13.8L4 12L6.7 10.2L7.5 7.5L10.2 8.3L12 6.5ZM12 10.2C13 10.2 13.8 11 13.8 12C13.8 13 13 13.8 12 13.8C11 13.8 10.2 13 10.2 12C10.2 11 11 10.2 12 10.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    electrical: (
      <path
        d="M13.2 3.8L7.8 12H11.5L10.8 20.2L16.2 12H12.5L13.2 3.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    civil: (
      <path
        d="M4.5 17.5H19.5M7 17.5V9.5L12 6L17 9.5V17.5M9.5 17.5V13H14.5V17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  };

  return (
    <span className="department-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        {icons[icon] || icons.computer}
      </svg>
    </span>
  );
}

export function DepartmentCard({ name, description, to, icon }) {
  return (
    <article className="department-card surface">
      <DepartmentIcon icon={icon} />
      <div className="department-card__content">
        <h3 className="department-card__title">{name}</h3>
        <p className="department-card__description">{description}</p>
      </div>
      <NavLink className="department-card__action" to={to}>
        Explore Department
      </NavLink>
    </article>
  );
}
