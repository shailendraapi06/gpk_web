import { NavLink } from "react-router-dom";
import { NoticeItem } from "./NoticeItem";

export function NoticeBoard({ title, viewAllLabel, viewAllTo, notices }) {
  return (
    <section className="notice-board surface" aria-labelledby="latest-notices-title">
      <div className="notice-board__header">
        <div className="notice-board__heading">
          <h2 id="latest-notices-title" className="notice-board__title">
            {title}
          </h2>
        </div>

        <NavLink className="notice-board__view-all" to={viewAllTo}>
          {viewAllLabel}
        </NavLink>
      </div>

      <div className="notice-board__list">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} {...notice} />
        ))}
      </div>
    </section>
  );
}
