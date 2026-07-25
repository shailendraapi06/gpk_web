export function GalleryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <section className="gallery-filter" aria-labelledby="gallery-filter-title">
      <h2 id="gallery-filter-title" className="sr-only">
        Gallery categories
      </h2>

      <div className="gallery-filter__list" role="tablist" aria-label="Gallery categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`gallery-filter__button${
              activeCategory === category ? " gallery-filter__button--active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
