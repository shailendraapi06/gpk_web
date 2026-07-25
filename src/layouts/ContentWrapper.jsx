import { PageContainer } from "./PageContainer";

export function ContentWrapper({
  as: Component = "div",
  className = "",
  contentClassName = "",
  children
}) {
  const classes = ["content-wrapper", className].filter(Boolean).join(" ");

  return (
    <Component className={classes}>
      <PageContainer className={contentClassName}>{children}</PageContainer>
    </Component>
  );
}
