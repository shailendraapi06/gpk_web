export function FeatureSplitSection({
  eyebrow,
  title,
  image,
  imageAlt,
  description,
  reverse = false
}) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section className="facilities-page-section" aria-labelledby={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <div className={`facilities-split${reverse ? " facilities-split--reverse" : ""}`}>
        <div className="facilities-split__media">
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>

        <div className="facilities-split__content">
          <p className="facilities-section__eyebrow">{eyebrow}</p>
          <h2
            id={`facilities-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}
            className="facilities-section__title"
          >
            {title}
          </h2>
          <div className="facilities-split__copy">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 15)}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
