export function GalleryItem({ item, onOpen, priority = false }) {
  return (
    <button
      type="button"
      className="gallery-item"
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
    >
      <div className="gallery-item__media">
        <img src={item.thumbnail} alt={item.title} loading={priority ? "eager" : "lazy"} />
      </div>
      <div className="gallery-item__overlay">
        <span className="gallery-item__category">{item.category}</span>
        <h3 className="gallery-item__title">{item.title}</h3>
        {item.type === "video" ? <span className="gallery-item__badge">Video</span> : null}
      </div>
    </button>
  );
}
