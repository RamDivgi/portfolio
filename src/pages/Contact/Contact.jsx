import "./Contact.css";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
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

    try {
      // Temporary console logs for the environment variables
      console.log("VITE_EMAILJS_SERVICE_ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log("VITE_EMAILJS_TEMPLATE_ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log("VITE_EMAILJS_PUBLIC_KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        }
      );

      toast.success("Message sent successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {

      console.error("EmailJS Error:", error);
      console.log("Status:", error.status);
      console.log("Text:", error.text);

      toast.error("Failed to send message. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="contact" id="contact">

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Contact Me</h2>
      </motion.div>

      <div className="contact-container">

        {/* Contact Info */}

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <h3>Get In Touch</h3>

          <p>
            Interested in working together? Whether it's an internship, project,
            collaboration, or career opportunity, feel free to get in touch.
          </p>

          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <span>sarveshdivgi@gmail.com</span>
          </div>

          <div className="info-item">
            <FaPhone className="contact-icon" />
            <span>+91 8217200691</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Mangalore, Karnataka</span>
          </div>

        </motion.div>

        {/* Contact Form */}

        <motion.form
          className="contact-form"
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <textarea
            rows="6"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </motion.form>

      </div>

    </div>

  );

}

export default Contact;