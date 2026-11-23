import "./Experience.css";
import { motion } from "framer-motion";
import { FaChartLine, FaLaptopCode } from "react-icons/fa";

const experiences = [
  {
    icon: <FaChartLine />,
    title: "Data Analysis Intern, Cognifyz IT Solutions",
    dateLine: "Jul 2026 – Aug 2026 · Remote",
    bullets: [
      "Executed 11 restaurant data analysis workflows covering data cleaning, exploratory data analysis, and geographic distribution.",
      "Extracted business insights and visualized correlation and trend metrics using Python, Pandas, NumPy, Matplotlib, and Plotly."
    ]
  },
  {
    icon: <FaLaptopCode />,
    title: "Web Development Intern, InAmigos Foundation",
    dateLine: "May 2026 – Jun 2026 · Remote",
    bullets: [
      "Built a responsive front-end web platform integrating scroll-reveal animations across 6 content sections and 4 programmes.",
      "Engineered a reusable photo gallery component displaying 30+ images across 5 program categories."
    ]
  }
];

export default function Experience() {
  return (
    <section className="experience" id="experience" aria-label="Professional Experience">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Experience</h2>
      </motion.div>

      <div className="timeline">
        {experiences.map((item, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.45,
              delay: index * 0.15
            }}
          >
            <div className="timeline-dot" aria-hidden="true">
              {item.icon}
            </div>

            <div className="timeline-card">
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-date">{item.dateLine}</div>

              <ul className="experience-bullets">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="bullet-dash" aria-hidden="true">–</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
