import "./Contact.css";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Direct service unavailable. Opening your default mail client!");
      window.location.href = `mailto:sarveshdivgi@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        {
          publicKey: publicKey
        }
      );

      toast.success("Message sent successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch {
      toast.error("Unable to send via form. Redirecting to mail client...");
      window.location.href = `mailto:sarveshdivgi@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact" aria-label="Contact Section">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Contact Me</h2>
      </motion.div>

      <div className="contact-container">
        {/* Contact Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3>Get In Touch</h3>

          <p>
            Interested in software engineering, full-stack, or AI/ML opportunities?
            Whether it's an internship, project collaboration, or technical discussion, feel free to reach out.
          </p>

          <div className="info-item">
            <FaEnvelope className="contact-icon" aria-hidden="true" />
            <a
              href="mailto:sarveshdivgi@gmail.com"
              className="contact-link"
              aria-label="Send email to sarveshdivgi@gmail.com"
            >
              sarveshdivgi@gmail.com
            </a>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
            <span>Mangalore, Karnataka, India</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="contact-form"
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-label="Direct message form"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            aria-label="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-label="Your Email"
            required
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            aria-label="Your Message"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="contact-submit-btn"
            aria-label="Submit message"
          >
            <FaPaperPlane aria-hidden="true" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
