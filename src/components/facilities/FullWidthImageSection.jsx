export function FullWidthImageSection({ eyebrow, title, image, imageAlt, description }) {
  return (
    <section className="facilities-page-section" aria-labelledby={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <div className="full-width-feature">
        <div className="full-width-feature__media">
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
        <div className="full-width-feature__content surface">
          <p className="facilities-section__eyebrow">{eyebrow}</p>
          <h2
            id={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}
            className="facilities-section__title"
          >
            {title}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
