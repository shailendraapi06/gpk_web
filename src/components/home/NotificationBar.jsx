import { NavLink } from "react-router-dom";
import { notifications } from "../../data/home/notifications";

function BellIcon() {
  return (
    <span className="notification-bar__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <path
          d="M12 5C9.8 5 8 6.8 8 9V11.2C8 12.3 7.6 13.4 6.8 14.2L5.8 15.2C5.2 15.8 5.6 16.8 6.4 16.8H17.6C18.4 16.8 18.8 15.8 18.2 15.2L17.2 14.2C16.4 13.4 16 12.3 16 11.2V9C16 6.8 14.2 5 12 5ZM10.4 18.4C10.7 19.3 11.3 19.8 12 19.8C12.7 19.8 13.3 19.3 13.6 18.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function NotificationBar() {
  const marqueeItems = [...notifications, ...notifications];

  return (
    <section className="notification-bar" aria-label="Announcements">
      <div className="notification-bar__inner">
        <BellIcon />
        <div className="notification-bar__track">
          <div className="notification-bar__marquee">
            {marqueeItems.map((item, index) => (
              item.href.startsWith("http") ? (
                <a
                  key={`${item.id}-${index}`}
                  className="notification-bar__link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={`${item.id}-${index}`}
                  className="notification-bar__link"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
