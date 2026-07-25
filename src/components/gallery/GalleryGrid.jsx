import { GalleryItem } from "./GalleryItem";

export function GalleryGrid({ items, onOpen }) {
  return (
    <section className="gallery-grid" aria-labelledby="gallery-grid-title">
      <h2 id="gallery-grid-title" className="sr-only">
        Gallery media items
      </h2>

      <div className="gallery-grid__columns" role="list" aria-label="Gallery items">
        {items.map((item) => (
          <div key={item.id} className="gallery-grid__entry" role="listitem">
            <GalleryItem item={item} onOpen={() => onOpen(item.id)} />
          </div>
        ))}
      </div>
    </section>
  );
}
