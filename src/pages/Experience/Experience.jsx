import "./Experience.css";
import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode } from "react-icons/fa";

const experiences = [
  {
    icon: <FaLaptopCode />,
    year: "Jul 2026 - Present",
    title: "Data Analysis Intern",
    company: "Cognifyz IT Solutions Pvt. Ltd.",
    description:
      "Working on real-world data analysis projects involving data cleaning, exploratory data analysis (EDA), data visualization, statistical analysis, and business insight generation using Python, Pandas, NumPy, Matplotlib, and Seaborn."
  },
  {
    icon: <FaBriefcase />,
    year: "May 2026",
    title: "Web Development Intern",
    company: "InAmigos Foundation",
    description:
      "Developed a responsive NGO awareness website using HTML and CSS while collaborating with the team to improve usability and user experience."
  }
];

export default function Experience() {

  return (
    <section className="experience" id="experience">

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
      >
        <h2>Experience</h2>
      </motion.div>

      <div className="timeline">

        {experiences.map((item, index) => (

          <motion.div
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: .4 }}
            transition={{
              duration: .6,
              delay: index * .2
            }}
          >

            <div className="timeline-dot">
              {item.icon}
            </div>

            <div className="timeline-card">

              <span className="timeline-year">
                {item.year}
              </span>

              <h3>{item.title}</h3>

              <h4>{item.company}</h4>

              <p>{item.description}</p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}