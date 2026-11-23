import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="footer-container">
        <p>© 2026 Shantaram S Divgi. All rights reserved.</p>

        <div className="social-icons" aria-label="Social and email links">
          <a
            href="https://github.com/RamDivgi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ram Divgi on GitHub"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/ram-divgi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Ram Divgi on LinkedIn"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a
            href="mailto:sarveshdivgi@gmail.com"
            aria-label="Send email to sarveshdivgi@gmail.com"
          >
            <FaEnvelope aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
