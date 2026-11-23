import "./Education.css";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const education = [
  {
    year: "2023 – Present",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Artificial Intelligence & Machine Learning",
    college: "Canara Engineering College, Mangalore, Karnataka",
    score: "CGPA: 7.9"
  },
  {
    year: "2021 – 2023",
    degree: "Pre-University (PCMB)",
    field: "Science",
    college: "Dr. A V Baliga College of Arts and Science, Kumta, Karnataka",
    score: "Percentage: 90.33%"
  }
];

export default function Education() {
  return (
    <section className="education" id="education">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Education</h2>
      </motion.div>

      <div className="timeline">
        {education.map((item, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2
            }}
          >
            <div className="timeline-dot">
              <FaGraduationCap />
            </div>

            <div className="timeline-card">
              <span className="timeline-year">
                {item.year}
              </span>

              <h3>{item.degree}</h3>
              <h4>{item.field}</h4>
              <p>{item.college}</p>
              {item.score && <strong className="education-score">{item.score}</strong>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
