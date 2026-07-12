import "./Project.css";
import { motion } from "framer-motion";

import imgPDF from "../../assets/images/docsphere.png";
import imgPortfolio from "../../assets/images/portfolio.png";
import imgTraffic from "../../assets/images/traffic.png";
import img4 from "../../assets/images/WordPress dashboard design concept.jpg";
import img5 from "../../assets/images/Game Dashboard Design.jpg";
import img6 from "../../assets/images/Task manager app.jpg";

const projects = [
  {
    title: "DocSphere",
    img: imgPDF,
    desc: "AI-powered document assistant for chatting with PDFs using RAG, semantic search, and modern web technologies.",
    skills: [
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "LangChain",
      "FAISS"
    ],
    github: "https://github.com/RamDivgi/DocSphere",
    demo: "https://docsphere-ai.vercel.app/"
  },

  {
    title: "Portfolio Website",
    img: imgPortfolio,
    desc: "Responsive portfolio website built with React and Framer Motion to showcase my work and skills.",
    skills: [
      "React",
      "Vite",
      "CSS",
      "Framer Motion",
      "JavaScript"
    ],
    github: "https://github.com/RamDivgi/Portfolio11",
    demo: "https://RamDivgi.github.io/Portfolio11"
  },

  {
    title: "Smart Traffic Control System for Verified Emergency Vehicle Passage",
    img: imgTraffic,
    desc: "AI-powered traffic control system with emergency vehicle detection, green corridor creation, and real-time maps.",
    skills: [
      "Python",
      "JavaScript",
      "Leaflet.js",
      "Firebase",
      "ESP32",
      "OpenStreetMap",
      "IoT",
      "AI"
    ],
    github: "https://github.com/RamDivgi/Smart-Traffic-Signal-Control-System",
    demo: "https://emergencyvehiclerouter.web.app"
  },

];

export default function Project() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (

    <section className="project" id="project">

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Project</h2>
      </motion.div>

      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        {projects.map((project, index) => (

          <motion.div className="project-card" key={index} variants={itemVariants}>

            <img src={project.img} alt={project.title} />

            <h3>{project.title}</h3>

            <p>{project.desc}</p>

            <div className="skills">
              {project.skills.map((skill, i) => (
                <a href="#" key={i}>{skill}</a>
              ))}
            </div>

            <div className="btns">

              <a
                href={project.github || "#"}
                target={project.github && project.github !== "#" ? "_blank" : "_self"}
                rel={project.github && project.github !== "#" ? "noopener noreferrer" : ""}
                className="btn"
              >
                <i className="fab fa-github"></i> GitHub
              </a>

              <a
                href={project.demo || "#"}
                target={project.demo && project.demo !== "#" ? "_blank" : "_self"}
                rel={project.demo && project.demo !== "#" ? "noopener noreferrer" : ""}
                className="btn"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>

            </div>

          </motion.div>

        ))}

      </motion.div>

      <motion.div
        className="explore-more-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href="https://github.com/RamDivgi"
          target="_blank"
          rel="noopener noreferrer"
          className="explore-btn"
        >
          Explore More Projects <i className="fas fa-arrow-right"></i>
        </a>
      </motion.div>

    </section>

  );

}