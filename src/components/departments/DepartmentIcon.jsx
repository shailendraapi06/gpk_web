export function DepartmentIcon({ icon, name, className = "departments-card__icon" }) {
  const icons = {
    computer: (
      <path d="M5 7.5C5 6.4 5.9 5.5 7 5.5H17C18.1 5.5 19 6.4 19 7.5V14.5C19 15.6 18.1 16.5 17 16.5H13.5L14.5 19H9.5L10.5 16.5H7C5.9 16.5 5 15.6 5 14.5V7.5ZM8 9.5H16M8 12.5H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    network: (
      <path d="M12 5V9M6.5 19V15.5M17.5 19V15.5M12 9C9.2 9 7 11.2 7 14V15.5H17V14C17 11.2 14.8 9 12 9ZM5 19H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    ai: (
      <path d="M8.5 8.5V6.5M15.5 8.5V6.5M12 5V3.5M8 14.5H16M9 19.5H15M7.5 9H16.5C17.6 9 18.5 9.9 18.5 11V14C18.5 15.1 17.6 16 16.5 16H7.5C6.4 16 5.5 15.1 5.5 14V11C5.5 9.9 6.4 9 7.5 9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    civil: (
      <path d="M4.5 17.5H19.5M7 17.5V9.5L12 6L17 9.5V17.5M9.5 17.5V13H14.5V17.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    mechanical: (
      <path d="M12 6.5L13.8 8.3L16.5 7.5L17.3 10.2L20 12L17.3 13.8L16.5 16.5L13.8 15.7L12 17.5L10.2 15.7L7.5 16.5L6.7 13.8L4 12L6.7 10.2L7.5 7.5L10.2 8.3L12 6.5ZM12 10.2C13 10.2 13.8 11 13.8 12C13.8 13 13 13.8 12 13.8C11 13.8 10.2 13 10.2 12C10.2 11 11 10.2 12 10.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    electrical: (
      <path d="M13.2 3.8L7.8 12H11.5L10.8 20.2L16.2 12H12.5L13.2 3.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    electronics: (
      <path d="M9 5.5V8M15 5.5V8M12 4V8M9 16V18.5M15 16V18.5M12 16V20M8 8.5H16C17.1 8.5 18 9.4 18 10.5V13.5C18 14.6 17.1 15.5 16 15.5H8C6.9 15.5 6 14.6 6 13.5V10.5C6 9.4 6.9 8.5 8 8.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    communication: (
      <path d="M6 16.5C6 13.2 8.7 10.5 12 10.5C15.3 10.5 18 13.2 18 16.5M8.8 13.7C8.8 11.9 10.2 10.5 12 10.5C13.8 10.5 15.2 11.9 15.2 13.7M11 16.5H13M12 7.5H12.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    automobile: (
      <path d="M7 15.5H17M8.2 18.5V16.5M15.8 18.5V16.5M6.5 15.5L7.8 10.8C8.1 9.8 9 9 10 9H14C15 9 15.9 9.8 16.2 10.8L17.5 15.5M8.8 12.5H15.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    chemical: (
      <path d="M10 4V9.5L5.5 17C5 17.8 5.6 19 6.6 19H17.4C18.4 19 19 17.8 18.5 17L14 9.5V4M9 9H15M9.5 13.5H14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    plastic: (
      <path d="M8 6.5H16M8 10.5H16M8 14.5H13M7 5.5H17C18.1 5.5 19 6.4 19 7.5V16.5C19 17.6 18.1 18.5 17 18.5H7C5.9 18.5 5 17.6 5 16.5V7.5C5 6.4 5.9 5.5 7 5.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    production: (
      <path d="M4.5 18.5H19.5M7 18.5V12.5M12 18.5V8.5M17 18.5V10.5M5 10L8.5 7L12 11L19 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    textile: (
      <path d="M8 6.5C8 8.4 9.6 10 11.5 10H12.5C14.4 10 16 8.4 16 6.5M12 10V18.5M9 18.5H15M8.5 6.5C8.5 5.1 9.6 4 11 4H13C14.4 4 15.5 5.1 15.5 6.5V7C15.5 8.4 14.4 9.5 13 9.5H11C9.6 9.5 8.5 8.4 8.5 7V6.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    design: (
      <path d="M6.5 17.5L17.5 6.5M6 18L8.5 17.5L17.5 8.5L15 6L6 15L6 18ZM13.5 7.5L16 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    pharmacy: (
      <path d="M9 6.5H15M12 4V9M8.5 9H15.5C17.4 9 19 10.6 19 12.5C19 14.4 17.4 16 15.5 16H8.5C6.6 16 5 14.4 5 12.5C5 10.6 6.6 9 8.5 9ZM9 16L15 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" aria-label={name}>
        {icons[icon] || icons.computer}
      </svg>
    </span>
  );
}
