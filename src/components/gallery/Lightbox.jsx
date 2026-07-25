import { useEffect } from "react";

export function Lightbox({ items, currentId, onClose, onPrevious, onNext }) {
  const currentItem = items.find((item) => item.id === currentId);

  useEffect(() => {
    if (!currentItem) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentItem, onClose, onNext, onPrevious]);

  if (!currentItem) {
    return null;
  }

  return (
    <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title">
      <button
        type="button"
        className="gallery-lightbox__backdrop"
        onClick={onClose}
        aria-label="Close gallery lightbox"
      />

      <div className="gallery-lightbox__panel">
        <div className="gallery-lightbox__toolbar">
          <div className="gallery-lightbox__meta">
            <span>{currentItem.category}</span>
            <h2 id="gallery-lightbox-title">{currentItem.title}</h2>
          </div>

          <button type="button" className="gallery-lightbox__close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="gallery-lightbox__content">
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={onPrevious}
            aria-label="Previous media"
          >
            Prev
          </button>

          <div className="gallery-lightbox__media">
            {currentItem.type === "video" ? (
              <iframe
                src={currentItem.embedUrl}
                title={currentItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={currentItem.src} alt={currentItem.title} />
            )}
          </div>

          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={onNext}
            aria-label="Next media"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
