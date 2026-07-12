import "./Skills.css";

import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaGitAlt,
    FaGithub,
    FaNodeJs,
    FaJava,
    FaPython
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiFirebase,
    SiMongodb,
    SiExpress,
    SiMysql,
    SiPhp,
    SiOpenai
} from "react-icons/si";

function Skills() {
    return (
        <div className="skills">
            <div className="skills-slider">
                <div className="skills-track">

                    <FaPython title="Python" />
                    <FaJs title="JavaScript" />
                    <FaHtml5 title="HTML5" />
                    <FaCss3Alt title="CSS3" />
                    <SiMysql title="SQL / MySQL" />
                    <FaJava title="Java" />
                    <SiOpenai title="Generative AI" />

                    <FaReact title="React" />
                    <SiTailwindcss title="Tailwind CSS" />
                    <FaNodeJs title="Node.js" />
                    <SiExpress title="Express.js" />
                    <SiPhp title="PHP" />
                    <SiFirebase title="Firebase" />
                    <SiMongodb title="MongoDB" />
                    <FaGitAlt title="Git" />
                    <FaGithub title="GitHub" />

                </div>
            </div>
        </div>
    );
}

export default Skills;