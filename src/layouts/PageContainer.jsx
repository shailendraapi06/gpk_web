export function PageContainer({ as: Component = "div", className = "", children }) {
  const classes = ["page-container", className].filter(Boolean).join(" ");

  return <Component className={classes}>{children}</Component>;
}
