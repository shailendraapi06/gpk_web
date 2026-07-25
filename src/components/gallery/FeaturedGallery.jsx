import { GalleryItem } from "./GalleryItem";

export function FeaturedGallery({ items, onOpen }) {
  if (!items.length) {
    return null;
  }

  const featuredItems = items.slice(0, 3);

  return (
    <section className="featured-gallery" aria-labelledby="featured-gallery-title">
      <div className="featured-gallery__header">
        <p className="featured-gallery__eyebrow">Featured</p>
        <h2 id="featured-gallery-title" className="featured-gallery__title">
          Featured Gallery
        </h2>
      </div>

      <div className="featured-gallery__grid">
        {featuredItems.map((item, index) => (
          <div
            key={item.id}
            className={`featured-gallery__item${
              index === 0 ? " featured-gallery__item--primary" : ""
            }`}
          >
            <GalleryItem item={item} onOpen={() => onOpen(item.id)} priority={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
