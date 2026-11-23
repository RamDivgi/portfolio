import "./Skills.css";
import { motion } from "framer-motion";

import {
  FaPython,
  FaJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaUnity,
  FaDatabase,
  FaBrain,
  FaCode,
  FaLaptopCode,
  FaChartLine,
  FaProjectDiagram,
  FaRobot,
  FaEye,
  FaComments,
  FaLayerGroup,
  FaSearch,
  FaNetworkWired
} from "react-icons/fa";

import {
  SiTypescript,
  SiPostgresql,
  SiFastapi,
  SiFirebase,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiPlotly
} from "react-icons/si";

import { TbTopologyStar3 } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
import { PiFileC } from "react-icons/pi";

// Shortened strictly to defensible skills demonstrated in projects or internships
const skillCategories = [
  {
    title: "Programming Languages",
    icon: <FaCode />,
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C", icon: <PiFileC /> },
      { name: "SQL", icon: <SiMysql /> },
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: <FaBrain />,
    skills: [
      { name: "Machine Learning", icon: <FaBrain /> },
      { name: "Generative AI", icon: <LuBrainCircuit /> },
      { name: "Large Language Models", icon: <FaComments /> },
      { name: "RAG", icon: <FaLayerGroup /> },
      { name: "LangChain", icon: <TbTopologyStar3 /> },
      { name: "AI Agents", icon: <FaRobot /> },
      { name: "NLP", icon: <FaComments /> },
      { name: "Computer Vision", icon: <FaEye /> },
    ]
  },
  {
    title: "Full Stack Development",
    icon: <FaLaptopCode />,
    skills: [
      { name: "React.js", icon: <FaReact /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "REST APIs", icon: <FaNetworkWired /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
    ]
  },
  {
    title: "Databases & Vector Stores",
    icon: <FaDatabase />,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQL", icon: <SiMysql /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "FAISS", icon: <FaSearch /> },
    ]
  },
  {
    title: "Data Analysis",
    icon: <FaChartLine />,
    skills: [
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Matplotlib", icon: <FaChartLine /> },
      { name: "Plotly", icon: <SiPlotly /> },
    ]
  },
  {
    title: "Core Computer Science",
    icon: <FaProjectDiagram />,
    skills: [
      { name: "Data Structures & Algorithms", icon: <FaProjectDiagram /> },
    ]
  },
  {
    title: "Tools & Platforms",
    icon: <FaDocker />,
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "SUMO", icon: <FaNetworkWired /> },
      { name: "Unity 3D", icon: <FaUnity /> },
    ]
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="skills-section">
      <motion.div 
        className="skills-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="skills-title">Technical Skills</h3>
        <p className="skills-subtitle">
          Core technical competencies applied across my engineering projects and internships
        </p>
      </motion.div>

      <motion.div 
        className="skills-categories-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skillCategories.map((cat, idx) => (
          <motion.div 
            className="skill-category-card" 
            key={idx}
            variants={cardVariants}
          >
            <div className="category-header">
              <span className="category-icon" aria-hidden="true">{cat.icon}</span>
              <h4>{cat.title}</h4>
            </div>

            <div className="skill-pills">
              {cat.skills.map((skill, sIdx) => (
                <div className="skill-pill" key={sIdx}>
                  <span className="pill-icon" aria-hidden="true">{skill.icon}</span>
                  <span className="pill-label">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}