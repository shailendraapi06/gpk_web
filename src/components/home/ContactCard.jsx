function ContactIcon({ icon }) {
  const icons = {
    address: (
      <path
        d="M12 20C12 20 18 14.4 18 9.5C18 6.46243 15.5376 4 12.5 4C9.46243 4 7 6.46243 7 9.5C7 14.4 12 20 12 20ZM12.5 11.5C13.6046 11.5 14.5 10.6046 14.5 9.5C14.5 8.39543 13.6046 7.5 12.5 7.5C11.3954 7.5 10.5 8.39543 10.5 9.5C10.5 10.6046 11.3954 11.5 12.5 11.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    phone: (
      <path
        d="M8.2 5.5H11L12.2 8.8L10.5 10.5C11.3 12 12.5 13.2 14 14L15.7 12.3L19 13.5V16.3C19 17.2 18.2 18 17.3 18C10.8 18 6 13.2 6 6.7C6 5.8 6.8 5 7.7 5H8.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    email: (
      <path
        d="M5 7.5C5 6.4 5.9 5.5 7 5.5H17C18.1 5.5 19 6.4 19 7.5V16.5C19 17.6 18.1 18.5 17 18.5H7C5.9 18.5 5 17.6 5 16.5V7.5ZM6.5 8.5L12 12.5L17.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    hours: (
      <path
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 8.5V12L14.8 14.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  };

  return (
    <span className="contact-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        {icons[icon] || icons.address}
      </svg>
    </span>
  );
}

export function ContactCard({ label, value, icon }) {
  return (
    <article className="contact-card surface">
      <ContactIcon icon={icon} />
      <div className="contact-card__content">
        <h3 className="contact-card__label">{label}</h3>
        <p className="contact-card__value">{value}</p>
      </div>
    </article>
  );
}
