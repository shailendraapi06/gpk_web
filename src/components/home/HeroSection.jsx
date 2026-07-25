import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../layout/Container";
import { Section } from "../../layouts/Section";
import { heroContent } from "../../data/home/hero";
import { apiRequest } from "../../services/api/client";

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slides, setSlides] = useState(heroContent.slides);
  const { title, tagline, ctaButtons, badges } = heroContent;

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await apiRequest("/homepage/hero");
        if (res && res.slides && res.slides.length > 0) {
          setSlides(res.slides);
        }
      } catch (err) {
        console.warn("Using default hero slides:", err);
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  return (
    <Section className="hero" aria-labelledby="home-hero-title">
      <div className="hero__media" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            className={`hero__image${index === activeSlideIndex ? " hero__image--active" : ""}`}
            src={slide.src}
            alt=""
          />
        ))}
        <div className="hero__overlay" />
      </div>

      <Container className="hero__container">
        <div className="hero__content surface">
          <div className="hero__copy flow">
            <p className="hero__eyebrow">Technical Education Excellence</p>
            <h1 id="home-hero-title" className="hero__title">
              {title}
            </h1>
            <p className="hero__tagline">{tagline}</p>
          </div>

          <div className="hero__actions" aria-label="Hero call to action">
            {ctaButtons.map((button) => (
              <NavLink
                key={button.label}
                className={`hero__button hero__button--${button.variant}`}
                to={button.to}
              >
                {button.label}
              </NavLink>
            ))}
          </div>

          <ul className="hero__badges" role="list" aria-label="Institution highlights">
            {badges.map((badge) => (
              <li key={badge.label} className="hero__badge">
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__slider-nav" aria-label="Campus slider navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero__dot${index === activeSlideIndex ? " hero__dot--active" : ""}`}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeSlideIndex}
              onClick={() => setActiveSlideIndex(index)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
