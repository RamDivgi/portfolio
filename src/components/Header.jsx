import "./Header.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
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
    { icon: faGithub, url: "https://github.com/RamDivgi" },
    { icon: faLinkedin, url: "https://www.linkedin.com/in/ram-divgi" },
    { icon: faInstagram, url: "https://www.instagram.com/ram.___11" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Highlight active section
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

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when menu is open
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
      <header className={scrolled ? "header scroll" : "header"}>
        <div className="logo">
          <h1><span>R</span>am</h1>
        </div>

        {/* Desktop Navigation */}
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

        <ul className="icons desktop-nav">
          {socialLinks.map((social, index) => (
            <li key={index}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to social profile`}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <motion.div
            initial={false}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
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
            <motion.div 
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
              <ul className="mobile-icons">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Link to social profile`}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;