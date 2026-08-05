import "./Skills.css";

import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaGitAlt,
    FaGithub,
    FaJava,
    FaPython,
} from "react-icons/fa";

import {
    SiTypescript,
    SiMysql,
    SiFastapi,
    SiPostgresql,
    SiFirebase,
} from "react-icons/si";

import { IoLogoTableau } from "react-icons/io5";

import { PiFileC } from "react-icons/pi";
import { TbTopologyStar3 } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";

const SiPowerbi = (props) => (
    <svg
        viewBox="0 -1 24 25"
        fill="currentColor"
        width="1em"
        height="1em"
        {...props}
    >
        <path d="M9.002 6.375c0-.484.393-.875.877-.875h3.368c.484 0 .877.391.877.875v16.75c0 .484-.393.875-.877.875H9.879a.877.877 0 0 1-.877-.875V6.375zM17.146 0c0-.484.393-.875.877-.875h3.368c.484 0 .877.391.877.875v23.125c0 .484-.393.875-.877.875h-3.368a.877.877 0 0 1-.877-.875V0zM.859 12.75c0-.484.393-.875.877-.875h3.368c.484 0 .877.391.877.875v10.375c0 .484-.393.875-.877.875H1.736A.877.877 0 0 1 .859 23.625V12.75z" />
    </svg>
);

const skills = [
    { icon: <FaPython />, title: "Python" },
    { icon: <FaJs />, title: "JavaScript" },
    { icon: <SiTypescript />, title: "TypeScript" },
    { icon: <FaJava />, title: "Java" },
    { icon: <PiFileC />, title: "C" },
    { icon: <FaHtml5 />, title: "HTML5" },
    { icon: <FaCss3Alt />, title: "CSS3" },
    { icon: <FaReact />, title: "React" },
    { icon: <SiFastapi />, title: "FastAPI" },
    { icon: <SiPostgresql />, title: "PostgreSQL" },
    { icon: <SiFirebase />, title: "Firebase" },
    { icon: <SiMysql />, title: "SQL" },
    { icon: <TbTopologyStar3 />, title: "LangChain" },
    { icon: <LuBrainCircuit />, title: "Generative AI" },
    { icon: <SiPowerbi />, title: "Power BI" },
    { icon: <IoLogoTableau />, title: "Tableau" },
    { icon: <FaGitAlt />, title: "Git" },
    { icon: <FaGithub />, title: "GitHub" },
];

function Skills() {
    return (
        <section className="skills">
            <div className="skills-slider">
                <div className="skills-track">
                    {[...skills, ...skills].map((skill, index) => (
                        <div
                            className="skill-icon"
                            key={index}
                            title={skill.title}
                        >
                            {skill.icon}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;