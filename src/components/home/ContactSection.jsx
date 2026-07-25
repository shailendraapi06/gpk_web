import { NavLink } from "react-router-dom";
import { contactItems, contactPreviewContent } from "../../data/home/contact";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { ContactCard } from "./ContactCard";

export function ContactSection() {
  const { title, subtitle, actionLabel, actionTo } = contactPreviewContent;

  return (
    <Section className="home-section contact-section" aria-labelledby="contact-section-title">
      <Container>
        <div className="contact-section__inner">
          <header className="contact-section__header">
            <p className="contact-section__eyebrow">Get In Touch</p>
            <h2 id="contact-section-title" className="contact-section__title">
              {title}
            </h2>
            <p className="contact-section__subtitle">{subtitle}</p>
            <NavLink className="contact-section__action" to={actionTo}>
              {actionLabel}
            </NavLink>
          </header>

          <div className="contact-section__cards" role="list" aria-label="Contact details">
            {contactItems.map((item) => (
              <div key={item.id} role="listitem">
                <ContactCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
