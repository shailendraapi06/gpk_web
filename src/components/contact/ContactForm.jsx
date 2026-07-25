function FormField({ field, value, error, onChange }) {
  const isTextarea = field.type === "textarea";
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div
      className={`contact-form__field${
        isTextarea ? " contact-form__field--full contact-form__field--message" : ""
      }`}
    >
      <label className="contact-form__label" htmlFor={field.name}>
        {field.label}
      </label>
      <Component
        id={field.name}
        name={field.name}
        type={isTextarea ? undefined : field.type}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        required={field.required}
        rows={isTextarea ? 6 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />
      <p
        id={`${field.name}-error`}
        className={`contact-form__error${error ? " is-visible" : ""}`}
      >
        {error || " "}
      </p>
    </div>
  );
}

export function ContactForm({
  fields,
  values,
  errors,
  onChange,
  onSubmit,
  submitLabel
}) {
  return (
    <form className="contact-form surface" onSubmit={onSubmit} noValidate>
      <div className="contact-form__grid">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={onChange}
          />
        ))}
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="contact-form__submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
