import "./Services.css";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaLaptopCode,
  FaChartBar
} from "react-icons/fa";

function Services() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="services" id="serv">

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Services</h2>
      </motion.div>

      <motion.div
        className="services-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >

        <motion.div className="service-card" variants={itemVariants}>
          <FaRobot className="service-icon" />
          <h3>AI & Machine Learning</h3>
          <p>Developing intelligent applications using Generative AI, RAG, LLMs, NLP, and machine learning models.</p>
        </motion.div>

        <motion.div className="service-card" variants={itemVariants}>
          <FaLaptopCode className="service-icon" />
          <h3>Full-Stack Development</h3>
          <p>Building responsive web applications using React, FastAPI, JavaScript, PostgreSQL, and REST APIs.</p>
        </motion.div>

        <motion.div className="service-card" variants={itemVariants}>
          <FaChartBar className="service-icon" />
          <h3>Data Analytics</h3>
          <p>Extracting actionable business insights and creating visualizations using Python, Pandas, NumPy, Matplotlib, Plotly, and SQL.</p>
        </motion.div>

      </motion.div>

    </div>
  );
}

export default Services;