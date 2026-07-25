export function Section({ as: Component = "section", className = "", children, ...props }) {
  const classes = ["layout-section", className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
