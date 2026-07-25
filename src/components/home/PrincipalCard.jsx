export function PrincipalCard({ photo, name, designation }) {
  return (
    <div className="principal-card surface">
      <div className="principal-card__frame">
        <img className="principal-card__image" src={photo.src} alt={photo.alt} />
      </div>
      <div className="principal-card__meta">
        <h3 className="principal-card__name">{name}</h3>
        <p className="principal-card__designation">{designation}</p>
      </div>
    </div>
  );
}
