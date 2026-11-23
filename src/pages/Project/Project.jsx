import "./Project.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaChartLine, FaTimes, FaArrowRight } from "react-icons/fa";

import imgTwin from "../../assets/images/digital_twin.svg";
import imgPDF from "../../assets/images/docsphere.png";
import imgTraffic from "../../assets/images/traffic.png";

const projects = [
  {
    id: "digital-twin",
    title: "AI-Powered Predictive Routing and Signal Preemption in a Digital Twin Environment",
    badge: "Featured Major Project",
    img: imgTwin,
    alt: "Mangaluru road network digital twin simulation and preemption route",
    description: "Predictive ambulance routing and traffic signal preemption on a Mangaluru road network digital twin.",
    highlights: [
      "ETA error reduced from 74.3s to 18.4s (MAE)",
      "57% lower inference latency",
      "39 automated tests"
    ],
    skills: ["Python", "SUMO", "TraCI", "Unity 3D", "A*"],
    github: "https://github.com/RamDivgi/AI-Predictive-Traffic-Digital-Twin",
    demo: null,
    isMajor: true,
    evaluationResults: [
      "Mean Absolute Error (MAE) reduced from 74.3s to 18.4s — 75% lower prediction error.",
      "57% reduction in controller inference latency on 6,306 benchmark evaluations.",
      "Rerouting reached destination in heavy-congestion and road-obstruction scenarios where baseline did not arrive within 689s.",
      "Unity 3D (C#) digital twin and web dispatch dashboard validated with 39 automated test suites."
    ]
  },

  {
    id: "docsphere",
    title: "DocSphere — AI-Powered PDF RAG Assistant",
    badge: "Full-Stack AI Application",
    img: imgPDF,
    alt: "DocSphere conversational PDF document Q&A dashboard",
    description: "RAG assistant for asking questions across multiple PDF documents.",
    highlights: [
      "Semantic search with LangChain and FAISS",
      "JWT authentication",
      "Persistent chat history"
    ],
    skills: ["FastAPI", "React", "TypeScript", "PostgreSQL", "LangChain"],
    github: "https://github.com/RamDivgi/DocSphere",
    demo: "https://docsphere-ai.vercel.app/",
    isMajor: false
  },

  {
    id: "smart-traffic",
    title: "Smart Traffic Control System for Verified Emergency Vehicle Passage",
    badge: "Patent Application Filed",
    img: imgTraffic,
    alt: "Smart Traffic Control System route tracking interface",
    description: "Emergency vehicle traffic control with live route tracking and automatic green corridors.",
    highlights: [
      "ESP32 vehicle detection",
      "Live GPS route tracking with Leaflet.js",
      "Patent application filed"
    ],
    skills: ["JavaScript", "Firebase", "ESP32", "Leaflet.js", "Python"],
    github: "https://github.com/RamDivgi/Smart-Traffic-Signal-Control-System",
    demo: "https://emergencyvehiclerouter.web.app",
    isMajor: false
  }
];

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
  };

  return (
    <section className="project" id="project" aria-label="Featured Projects">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Projects</h2>
      </motion.div>

      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project) => (
          <motion.div 
            className={`project-card ${project.isMajor ? "featured-card" : ""}`} 
            key={project.id} 
            variants={itemVariants}
          >
            <div className="card-image-wrap">
              <img 
                src={project.img} 
                alt={project.alt} 
                loading="lazy"
              />
              <span className={`project-badge ${project.badge === "Patent Application Filed" ? "patent-badge" : ""}`}>
                {project.badge}
              </span>
            </div>

            <div className="card-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Highlights List */}
              <ul className="project-highlights">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              {/* Skills Tags (4-5 tags maximum) */}
              <div className="skills-tags-wrap" aria-label="Technologies used">
                {project.skills.map((skill, i) => (
                  <span className="project-tag" key={i}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="btns">
              {project.isMajor ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-glass"
                    aria-label={`View evaluation results for ${project.title}`}
                  >
                    <FaChartLine aria-hidden="true" /> Evaluation Results
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <FaGithub aria-hidden="true" /> GitHub
                  </a>
                </>
              ) : (
                <>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-glass"
                      aria-label={`Open live demo for ${project.title}`}
                    >
                      <FaExternalLinkAlt aria-hidden="true" /> Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-glass"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <FaGithub aria-hidden="true" /> GitHub
                    </a>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="explore-more-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <a
          href="https://github.com/RamDivgi"
          target="_blank"
          rel="noopener noreferrer"
          className="explore-btn"
          aria-label="Explore more software engineering projects on GitHub"
        >
          Explore More Projects on GitHub <FaArrowRight aria-hidden="true" />
        </a>
      </motion.div>

      {/* Evaluation Results Modal for Major Project */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="modal-overlay" 
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
          >
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-badge">{selectedProject.badge}</span>
                  <h3 id="modal-heading">Evaluation Results</h3>
                  <p className="modal-subheading">{selectedProject.title}</p>
                </div>
                <button 
                  className="modal-close" 
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close evaluation results modal"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </div>

              <div className="modal-body">
                <h4>Verified Evaluation Metrics</h4>
                <ul className="modal-highlights">
                  {selectedProject.evaluationResults.map((item, i) => (
                    <li key={i}>
                      <span className="bullet-dash">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="modal-tech-stack">
                  <h4>Technologies Applied</h4>
                  <div className="skills-tags-wrap">
                    {selectedProject.skills.map((skill, i) => (
                      <span className="project-tag" key={i}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                    aria-label="Inspect simulation code on GitHub"
                  >
                    <FaGithub aria-hidden="true" /> View Source on GitHub
                  </a>
                )}
                <button 
                  className="btn btn-glass"
                  onClick={() => setSelectedProject(null)}
                  type="button"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}