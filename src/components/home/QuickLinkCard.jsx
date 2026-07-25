import { NavLink } from "react-router-dom";
import { QuickLinkIcon } from "./QuickLinkIcon";

export function QuickLinkCard({ title, description, to, icon }) {
  return (
    <NavLink className="quick-link-card surface" to={to}>
      <QuickLinkIcon icon={icon} title={title} />
      <div className="quick-link-card__content">
        <h3 className="quick-link-card__title">{title}</h3>
        <p className="quick-link-card__description">{description}</p>
      </div>
    </NavLink>
  );
}
