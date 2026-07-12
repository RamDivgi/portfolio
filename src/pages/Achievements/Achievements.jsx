import "./Achievements.css";
import { motion } from "framer-motion";
import {
  FaAward,
  FaCertificate,
  FaBriefcase,
  FaLaptopCode
} from "react-icons/fa";

const achievements = [
  {
    icon: <FaAward />,
    title: "Patent",
    subtitle: "Smart Traffic Control System for Verified Emergency Vehicle Passage",
    desc: "Patent filed for an AI & IoT based emergency vehicle traffic management system."
  },
  {
    icon: <FaBriefcase />,
    title: "Internship",
    subtitle: "InAmigos Foundation",
    desc: "Completed Web Development Internship by building a responsive NGO awareness website."
  },
  {
    icon: <FaCertificate />,
    title: "Certifications",
    subtitle: "Antropic • GeeksforGeeks • Forage",
    desc: "Completed industry certifications in AI, cloud computing, web Development and software development."
  }
];

export default function Achievements() {

  return (
    <section className="achievements" id="achievements">

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
      >
        <h2>Achievements</h2>
      </motion.div>

      <div className="achievement-grid">

        {achievements.map((item, index) => (

          <motion.div
            className="achievement-card"
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: .5,
              delay: index * .15
            }}
          >

            <div className="achievement-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <h4>{item.subtitle}</h4>

            <p>{item.desc}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}