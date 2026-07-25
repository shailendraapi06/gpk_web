export function DepartmentGallerySection({ gallery }) {
  return (
    <section className="department-detail-section" aria-labelledby="department-gallery-title">
      <div className="department-detail-section__heading">
        <p className="department-detail-section__eyebrow">Gallery</p>
        <h2 id="department-gallery-title" className="department-detail-section__title">
          {gallery.heading}
        </h2>
        <p className="department-detail-section__description">{gallery.description}</p>
      </div>

      <div className="department-gallery" role="list" aria-label="Department gallery">
        {gallery.items.map((item) => (
          <article key={item.id} className="department-gallery__item" role="listitem">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="department-gallery__overlay">
              <span>{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
