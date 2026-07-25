export function LeadershipCard({ name, designation, photo }) {
  return (
    <article className="leadership-card surface">
      <img className="leadership-card__photo" src={photo.src} alt={photo.alt} loading="lazy" />
      <div className="leadership-card__content">
        <h3 className="leadership-card__name">{name}</h3>
        <p className="leadership-card__designation">{designation}</p>
      </div>
    </article>
  );
}
