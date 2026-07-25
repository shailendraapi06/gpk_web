import { DepartmentCard } from "./DepartmentCard";

export function DepartmentGrid({ departments }) {
  return (
    <div className="departments-grid" role="list" aria-label="Academic departments">
      {departments.map((department) => (
        <div key={department.slug} role="listitem">
          <DepartmentCard {...department} />
        </div>
      ))}
    </div>
  );
}
