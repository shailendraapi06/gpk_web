export function FacultyFilters({
  searchValue,
  onSearchChange,
  departmentValue,
  onDepartmentChange,
  departments,
  searchPlaceholder,
  filterLabel
}) {
  return (
    <section className="faculty-filters" aria-labelledby="faculty-filters-title">
      <h2 id="faculty-filters-title" className="sr-only">
        Faculty search and filters
      </h2>

      <div className="faculty-filters__field">
        <label className="sr-only" htmlFor="faculty-search">
          Search faculty
        </label>
        <input
          id="faculty-search"
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="faculty-filters__field">
        <label htmlFor="faculty-department-filter">{filterLabel}</label>
        <select
          id="faculty-department-filter"
          value={departmentValue}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
