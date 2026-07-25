import { NavLink } from "react-router-dom";
import { principalContent } from "../../data/home/principal";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { PrincipalCard } from "./PrincipalCard";

export function PrincipalSection() {
  const { sectionTitle, name, designation, message, actionLabel, actionTo, photo } =
    principalContent;

  return (
    <Section className="home-section principal-section" aria-labelledby="principal-section-title">
      <Container>
        <div className="principal-section__grid">
          <PrincipalCard photo={photo} name={name} designation={designation} />

          <div className="principal-section__content">
            <p className="principal-section__eyebrow">Leadership Message</p>
            <h2 id="principal-section-title" className="principal-section__title">
              {sectionTitle}
            </h2>
            <p className="principal-section__name">{name}</p>
            <p className="principal-section__designation">{designation}</p>
            <blockquote className="principal-section__message">
              <p>{message}</p>
            </blockquote>
            <NavLink className="principal-section__action" to={actionTo}>
              {actionLabel}
            </NavLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
