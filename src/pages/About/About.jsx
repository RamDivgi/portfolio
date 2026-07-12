import { useState } from "react";
import "./About.css";
import Skills from "./Skills";

function About() {

  const [flip, setFlip] = useState(false);

  return (
    <div className="about" id="about">

      <div className="title">
        <h2>About Me</h2>
      </div>

      <div className="content">

        <div
          className="photo-card"
          onClick={() => setFlip(!flip)}
        >

          <div className={flip ? "photo-inner flip" : "photo-inner"}>

            {/* FRONT IMAGE */}

            <div className="photo-front">
              <img src="img3.jpeg" alt="" />
            </div>

            {/* BACK IMAGE */}

            <div className="photo-back">
              <img src="img4.png" alt="" />
            </div>

          </div>

        </div>

        <div className="text-about">
          <p>
            Hi, I'm <strong>Shantaram S Divgi (Ram)</strong>, an Artificial Intelligence and Machine Learning student passionate about creating software that solves real-world problems. I enjoy working with AI, full-stack development, and modern web technologies to build applications that are simple, efficient, and user-friendly. I believe in continuous learning, exploring new ideas, and turning them into practical solutions that make a meaningful impact.
          </p>
        </div>

      </div>

      <Skills />

    </div>
  );
}

export default About;