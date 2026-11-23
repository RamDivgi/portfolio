import "./Achievements.css";
import { motion } from "framer-motion";

const patentData = {
  label: "PATENT APPLICATION FILED",
  statusNote: "Status: filed, not granted",
  title: "Smart Traffic Control System for Verified Emergency Vehicle Passage",
  desc: "Patent application filed for an emergency vehicle traffic control system.",
  highlights: [
    "ESP32 vehicle detection",
    "Green-corridor preemption",
    "Live GPS route sync"
  ]
};

const certifications = [
  { name: "Introduction to Model Context Protocol (MCP)", issuer: "ANTHROPIC" },
  { name: "Create Your First Gemini Enterprise Applications", issuer: "GOOGLE CLOUD" },
  { name: "Getting Started with Generative AI", issuer: "IBM SKILLSBUILD" },
  { name: "Software Engineering Job Simulation", issuer: "JPMORGAN CHASE & CO. (FORAGE)" },
  { name: "Fundamentals of Docker and Kubernetes", issuer: "SCALER" }
];

const learningCourses = [
  {
    issuer: "SALESFORCE TRAILHEAD",
    title: "Salesforce Agentblazer, AI and agent development learning modules",
    tag: "Learning module"
  },
  {
    issuer: "GEEKSFORGEEKS",
    title: "Generative AI and ChatGPT",
    tag: "Course completion"
  },
  {
    issuer: "GEEKSFORGEEKS",
    title: "AWS Certified Solution Architect Associate, Self Paced Course",
    tag: "Course completion",
    note: "Course completion, not an AWS certification"
  }
];

const currentlyLearning = [
  "Generative AI and AI Agent Development"
];

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="achievements" id="achievements" aria-label="Achievements and Certifications">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Achievements</h2>
      </motion.div>

      <motion.div
        className="achievements-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* a) Patent banner (full-width glass card) */}
        <motion.div className="patent-banner" variants={itemVariants}>
          <div className="patent-main">
            <div className="patent-label-row">
              <span className="patent-label">{patentData.label}</span>
              <span className="patent-status-note">{patentData.statusNote}</span>
            </div>
            <h3 className="patent-title">{patentData.title}</h3>
            <p className="patent-desc">{patentData.desc}</p>
          </div>

          <div className="patent-highlights">
            {patentData.highlights.map((item, idx) => (
              <div className="patent-highlight-item" key={idx}>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* b) Certifications grid */}
        <motion.div className="achievements-block" variants={itemVariants}>
          <h3 className="block-heading">Certifications</h3>

          <div className="cards-grid">
            {certifications.map((cert, idx) => (
              <motion.div className="cert-card" key={idx} variants={itemVariants}>
                <span className="card-issuer">{cert.issuer}</span>
                <h4 className="card-title">{cert.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* c) Learning & Courses grid */}
        <motion.div className="achievements-block" variants={itemVariants}>
          <h3 className="block-heading">Learning & Courses</h3>

          <div className="cards-grid secondary-grid">
            {learningCourses.map((item, idx) => (
              <motion.div className="cert-card secondary-card" key={idx} variants={itemVariants}>
                <div className="card-top-row">
                  <span className="card-issuer">{item.issuer}</span>
                  <span className="card-tag">{item.tag}</span>
                </div>
                <h4 className="card-title">{item.title}</h4>
                {item.note && <div className="card-note">{item.note}</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* d) Learning Areas row */}
        <motion.div className="learning-areas-block" variants={itemVariants}>
          <span className="learning-areas-label">Currently learning</span>
          <div className="learning-chips">
            {currentlyLearning.map((area, idx) => (
              <span className="learning-chip" key={idx}>{area}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
