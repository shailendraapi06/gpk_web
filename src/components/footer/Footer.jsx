import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { footerLinkGroups } from "../../data/footerLinks";
import { socialLinks as defaultSocialLinks } from "../../data/socialLinks";
import { PageContainer } from "../../layouts/PageContainer";
import { apiRequest } from "../../services/api/client";

const defaultCollegeInfo = {
  title: "Government Polytechnic Kanpur",
  description:
    "A professional academic web platform foundation for institutional information, student services, and future API-driven updates."
};

const defaultContactDetails = [
  "Government Polytechnic Kanpur, GT Road, Kanpur, UP - 208002",
  "info@gpk.ac.in",
  "+91 512 258 0188"
];

function FooterLinkGroup({ title, links }) {
  return (
    <section className="footer__group" aria-labelledby={`footer-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <h2
        id={`footer-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="footer__heading"
      >
        {title}
      </h2>
      <ul className="footer__links" role="list">
        {links.map((link, index) => (
          <li key={link.id || `${link.to}-${link.label}-${index}`}>
            <NavLink className="footer__link" to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SocialLinkList({ links }) {
  return (
    <section className="footer__group" aria-labelledby="footer-social-links">
      <h2 id="footer-social-links" className="footer__heading">
        Social Links
      </h2>
      <ul className="footer__socials" role="list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="footer__social-link"
              href={link.href || link.url || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <span aria-hidden="true">{link.shortLabel || link.label.substring(0, 2)}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [collegeInfo, setCollegeInfo] = useState(defaultCollegeInfo);
  const [contactDetails, setContactDetails] = useState(defaultContactDetails);
  const [socials, setSocials] = useState(defaultSocialLinks);

  useEffect(() => {
    async function fetchFooterSettings() {
      try {
        const res = await apiRequest("/settings");
        if (res && res.settings) {
          const s = res.settings;
          setCollegeInfo({
            title: s.collegeName || defaultCollegeInfo.title,
            description: s.collegeDescription || s.tagline || defaultCollegeInfo.description
          });

          const contacts = [];
          if (s.address) contacts.push(s.address);
          if (s.email || s.primaryEmail) contacts.push(s.email || s.primaryEmail);
          if (s.phone) contacts.push(s.phone);

          if (contacts.length > 0) {
            setContactDetails(contacts);
          }

          if (s.socials && s.socials.length > 0) {
            setSocials(s.socials);
          }
        }
      } catch (err) {
        console.warn("Could not fetch settings for Footer:", err);
      }
    }
    fetchFooterSettings();
  }, []);

  return (
    <footer className="footer" role="contentinfo">
      <PageContainer className="footer__container">
        <div className="footer__grid">
          <section className="footer__group footer__group--wide" aria-labelledby="footer-college-info">
            <h2 id="footer-college-info" className="footer__heading">
              College Info
            </h2>
            <div className="footer__info flow">
              <p className="footer__brand">{collegeInfo.title}</p>
              <p className="footer__copy">{collegeInfo.description}</p>
            </div>
          </section>

          {footerLinkGroups.map((group) => (
            <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
          ))}

          <section className="footer__group" aria-labelledby="footer-contact-information">
            <h2 id="footer-contact-information" className="footer__heading">
              Contact Information
            </h2>
            <address className="footer__contact">
              <ul className="footer__links" role="list">
                {contactDetails.map((item) => (
                  <li key={item} className="footer__contact-item">
                    {item}
                  </li>
                ))}
              </ul>
            </address>
          </section>

          <SocialLinkList links={socials} />
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {collegeInfo.title}. All rights reserved.
            {" | "}
            <NavLink to="/admin" style={{ textDecoration: "underline", color: "var(--color-accent-300)", marginLeft: "0.5rem" }}>
              Admin Portal Login
            </NavLink>
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
