import { NavLink } from "react-router-dom";
import { DepartmentIcon } from "./DepartmentIcon";

export function DepartmentCard({ slug, name, description, hodName, icon }) {
  return (
    <article className="departments-card surface">
      <DepartmentIcon icon={icon} name={name} />
      <div className="departments-card__content">
        <h3 className="departments-card__title">{name}</h3>
        <p className="departments-card__description">{description}</p>
        <p className="departments-card__hod">
          <span>HOD:</span> {hodName}
        </p>
      </div>
      <NavLink className="departments-card__action" to={`/departments/${slug}`}>
        Explore Department
      </NavLink>
    </article>
  );
}
