import { Container } from "./Container";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Contact", href: "#contact" }
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="brand-mark" href="#home" aria-label="Government Polytechnic Kanpur home">
          <span className="brand-mark__title">Government Polytechnic Kanpur</span>
          <span className="brand-mark__subtitle">Production Frontend Foundation</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
