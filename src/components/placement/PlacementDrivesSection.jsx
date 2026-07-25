import { PlacementTable } from "./PlacementTable";

const driveColumns = [
  { key: "company", label: "Company" },
  { key: "date", label: "Date" },
  { key: "eligibility", label: "Eligibility" },
  {
    key: "status",
    label: "Status",
    render: (row) => <span className="placement-table__status">{row.status}</span>
  },
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

export function PlacementDrivesSection({ drives }) {
  return (
    <section className="placement-page-section" aria-labelledby="placement-drives-title">
      <div className="placement-page-section__header">
        <p className="placement-page-section__eyebrow">Campus Drives</p>
        <h2 id="placement-drives-title" className="placement-page-section__title">
          Placement Drives
        </h2>
      </div>

      <PlacementTable caption="Placement drives" columns={driveColumns} rows={drives} />
    </section>
  );
}
