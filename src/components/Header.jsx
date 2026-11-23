import "./Header.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#project" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#achievements" },
    { name: "Services", href: "#serv" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: faGithub, url: "https://github.com/RamDivgi" },
    { name: "LinkedIn", icon: faLinkedin, url: "https://www.linkedin.com/in/ram-divgi" },
    { name: "Email", icon: faEnvelope, url: "mailto:sarveshdivgi@gmail.com" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      let current = "hero";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={scrolled ? "header scroll" : "header"} aria-label="Site Header">
        <div className="logo">
          <a href="#hero" style={{ textDecoration: "none", color: "inherit" }} aria-label="Ram home">
            <h1><span>R</span>am</h1>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="links desktop-nav">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className={activeSection === link.href.substring(1) ? "active" : ""}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="icons desktop-nav" aria-label="Header social and contact links">
          {socialLinks.map((social, index) => (
            <li key={index}>
              <a
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : "_self"}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : ""}
                aria-label={`Link to ${social.name}`}
              >
                <FontAwesomeIcon icon={social.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} aria-hidden="true" />
          </motion.div>
        </button>
      </header>

      {/* Mobile Menu & Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="mobile-nav-container">
            <motion.div 
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.nav 
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <ul className="mobile-links">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      onClick={closeMenu}
                      className={activeSection === link.href.substring(1) ? "active" : ""}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mobile-icons" aria-label="Mobile social links">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : "_self"}
                      rel={social.url.startsWith("http") ? "noopener noreferrer" : ""}
                      aria-label={`Link to ${social.name}`}
                    >
                      <FontAwesomeIcon icon={social.icon} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
