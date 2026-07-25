export function GalleryCard({ title, category, src, alt }) {
  return (
    <article className="gallery-card">
      <img className="gallery-card__image" src={src} alt={alt} loading="lazy" />
      <div className="gallery-card__overlay" />
      <div className="gallery-card__content">
        <p className="gallery-card__category">{category}</p>
        <h3 className="gallery-card__title">{title}</h3>
      </div>
    </article>
  );
}
