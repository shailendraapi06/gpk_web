import { PlacementTable } from "./PlacementTable";

const noticeColumns = [
  { key: "date", label: "Date" },
  { key: "title", label: "Title" },
  {
    key: "action",
    label: "Action",
    render: (row) => (
      <a className="placement-table__action" href={row.actionUrl} target="_blank" rel="noreferrer">
        {row.actionLabel}
      </a>
    )
  }
];

export function PlacementNoticesSection({ notices }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-notices-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">Updates</p>
        <h2 id="placement-notices-title" className="placement-page-section__title">
          Placement Notices
        </h2>
      </div>

      <PlacementTable caption="Placement notices" columns={noticeColumns} rows={notices} />
    </section>
  );
}
