import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import collegeLogo from "../../assets/branding/logo.png";
import { publicNavigationItems } from "../../data/navigation";
import { PageContainer } from "../../layouts/PageContainer";

function CollegeBrand() {
  return (
    <NavLink className="navbar__brand" to="/" aria-label="Government Polytechnic Kanpur home">
      <span className="navbar__brand-mark">
        <img
          className="navbar__brand-logo"
          src={collegeLogo}
          alt="Government Polytechnic Kanpur logo"
        />
      </span>
      <span className="navbar__brand-text">
        <span className="navbar__brand-title">Government Polytechnic Kanpur</span>
      </span>
    </NavLink>
  );
}

function MenuButton({ isOpen, controls, onClick }) {
  return (
    <button
      type="button"
      className="navbar__toggle"
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      onClick={onClick}
    >
      <span className="navbar__toggle-line" />
      <span className="navbar__toggle-line" />
      <span className="navbar__toggle-line" />
    </button>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar" role="banner">
      <PageContainer className="navbar__container">
        <div className="navbar__bar">
          <CollegeBrand />
          <MenuButton
            isOpen={isOpen}
            controls={menuId}
            onClick={() => setIsOpen((current) => !current)}
          />
        </div>

        <nav
          id={menuId}
          className={`navbar__menu${isOpen ? " navbar__menu--open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul className="navbar__list" role="list">
            {publicNavigationItems.map((item) => (
              <li key={item.to} className="navbar__item">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? " navbar__link--active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </PageContainer>
    </header>
  );
}
