import { NavLink } from "react-router-dom";
import { galleryItems, gallerySectionContent } from "../../data/home/gallery";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { GalleryCard } from "./GalleryCard";

export function GallerySection() {
  return (
    <Section className="home-section gallery-section" aria-labelledby="gallery-section-title">
      <Container>
        <div className="gallery-section__inner">
          <header className="gallery-section__header">
            <div>
              <p className="gallery-section__eyebrow">Campus Life</p>
              <h2 id="gallery-section-title" className="gallery-section__title">
                {gallerySectionContent.title}
              </h2>
              <p className="gallery-section__subtitle">{gallerySectionContent.subtitle}</p>
            </div>
            <NavLink className="gallery-section__action" to={gallerySectionContent.actionTo}>
              {gallerySectionContent.actionLabel}
            </NavLink>
          </header>

          <div className="gallery-masonry" role="list" aria-label="Campus gallery preview">
            {galleryItems.map((item) => (
              <div key={item.id} role="listitem" className="gallery-masonry__item">
                <GalleryCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
