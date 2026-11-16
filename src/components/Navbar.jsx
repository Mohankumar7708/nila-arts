
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Classes", href: "#classes" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-navbar">
      <div className="navbar-container">

        {/* NILA ARTS LOGO */}
        <a
          href="#home"
          className="brand-logo"
          onClick={closeMenu}
        >
          <img
            src="/nila-arts-logo.png"
            alt="Nila Arts"
          />
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CONTACT BUTTON */}
        <a href="#contact" className="navbar-cta">
          Let's Talk
          <ArrowUpRight size={18} />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
