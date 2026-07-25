function VisionMissionBlock({ title, points }) {
  return (
    <section className="vision-mission__block surface" aria-labelledby={`about-${title.toLowerCase()}-title`}>
      <h3 id={`about-${title.toLowerCase()}-title`} className="vision-mission__title">
        {title}
      </h3>
      <ul className="vision-mission__list">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export function VisionMissionSection({ content }) {
  return (
    <section className="about-page-section" aria-labelledby="about-vision-mission-title">
      <div className="about-section__header">
        <p className="about-section__eyebrow">Institutional Direction</p>
        <h2 id="about-vision-mission-title" className="about-section__title">
          Vision & Mission
        </h2>
      </div>

      <div className="vision-mission">
        <VisionMissionBlock {...content.vision} />
        <VisionMissionBlock {...content.mission} />
      </div>
    </section>
  );
}
