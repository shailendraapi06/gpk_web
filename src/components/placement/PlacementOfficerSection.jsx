export function PlacementOfficerSection({ officer }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-officer-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">Leadership</p>
        <h2 id="placement-officer-title" className="placement-page-section__title">
          Training & Placement Officer
        </h2>
      </div>

      <div className="placement-officer">
        <div className="placement-officer__media surface">
          <img src={officer.photo} alt={officer.name} loading="lazy" />
        </div>

        <div className="placement-officer__content">
          <h3 className="placement-officer__name">{officer.name}</h3>
          <p className="placement-officer__designation">{officer.designation}</p>
          <p className="placement-officer__message">{officer.message}</p>

          <dl className="placement-officer__contact">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${officer.contact.email}`}>{officer.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{officer.contact.phone}</dd>
            </div>
            <div>
              <dt>Office Hours</dt>
              <dd>{officer.contact.officeHours}</dd>
            </div>
          </dl>

          <a
            className="placement-officer__action"
            href={officer.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Profile
          </a>
        </div>
      </div>
    </section>
  );
}
