const iconPaths = {
  admission: (
    <path
      d="M12 3L21 7.5L12 12L3 7.5L12 3ZM6 10.2V15.4C6 16.8 8.7 18 12 18C15.3 18 18 16.8 18 15.4V10.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  notices: (
    <path
      d="M7 5H17C18.1 5 19 5.9 19 7V17C19 18.1 18.1 19 17 19H7C5.9 19 5 18.1 5 17V7C5 5.9 5.9 5 7 5ZM8.5 9H15.5M8.5 12H15.5M8.5 15H13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  calendar: (
    <path
      d="M8 3V6M16 3V6M5 9H19M7 5H17C18.1 5 19 5.9 19 7V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V7C5 5.9 5.9 5 7 5ZM9 13H10V14H9V13ZM13 13H14V14H13V13ZM9 16H10V17H9V16Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  timetable: (
    <path
      d="M6 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4ZM4 9H20M9 4V20M9 12H20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  syllabus: (
    <path
      d="M7 4H17C18.1 4 19 4.9 19 6V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V6C5 4.9 5.9 4 7 4ZM8.5 8H15.5M8.5 11.5H15.5M8.5 15H12.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  results: (
    <path
      d="M5 18L10 13L13 16L19 9M19 9H14M19 9V14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  downloads: (
    <path
      d="M12 4V14M12 14L8 10M12 14L16 10M5 18H19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  facilities: (
    <path
      d="M4.5 18.5H19.5M7 18.5V8.5L12 5.5L17 8.5V18.5M9 12H10M14 12H15M9 15H10M14 15H15M11 18.5V14H13V18.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  scholarship: (
    <path
      d="M12 4.5L19 8L12 11.5L5 8L12 4.5ZM7.5 10V14.5C7.5 16 9.5 17 12 17C14.5 17 16.5 16 16.5 14.5V10M18.5 9.5V14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  placement: (
    <path
      d="M4 18H20M6 18V10M12 18V6M18 18V12M4 8L8.5 4L12.5 8L20 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
};

export function QuickLinkIcon({ icon, title }) {
  return (
    <span className="quick-link-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" aria-label={title}>
        {iconPaths[icon] || iconPaths.admission}
      </svg>
    </span>
  );
}
