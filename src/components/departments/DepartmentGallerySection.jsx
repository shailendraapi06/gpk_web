export function DepartmentGallerySection({ gallery }) {
  if (!gallery) return null;
  const items = Array.isArray(gallery.items) ? gallery.items : [];
  if (items.length === 0) return null;

  return (
    <section className="department-detail-section" aria-labelledby="department-gallery-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Gallery</p>
        <h2 id="department-gallery-title" className="department-detail-section__title">
          {gallery.heading || "Department Gallery"}
        </h2>
        {gallery.description && (
          <p className="department-detail-section__description">{gallery.description}</p>
        )}
      </div>

      <div className="department-gallery" role="list" aria-label="Department gallery">
        {items.map((item, idx) => (
          <article key={item.id || idx} className="department-gallery__item" role="listitem">
            <img src={item.image || item.src || item.imageUrl} alt={item.title || "Gallery Item"} loading="lazy" />
            <div className="department-gallery__overlay">
              <span>{item.category || "General"}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
