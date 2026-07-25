import { NavLink } from "react-router-dom";

export function GalleryStripSection({ section }) {
  return (
    <section className="facilities-page-section" aria-labelledby="facilities-gallery-strip-title">
      <div className="facilities-gallery-strip__header">
        <div>
          <p className="facilities-section__eyebrow">Gallery Strip</p>
          <h2 id="facilities-gallery-strip-title" className="facilities-section__title">
            {section.title}
          </h2>
        </div>

        <NavLink className="facilities-gallery-strip__action" to={section.actionTo}>
          {section.actionLabel}
        </NavLink>
      </div>

      <div className="facilities-gallery-strip">
        {section.items.map((item) => (
          <div key={item.id} className="facilities-gallery-strip__item">
            <img src={item.image} alt={item.imageAlt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
