import { useState } from "react";
import "./About.css";
import Skills from "./Skills";

function About() {
  const [flip, setFlip] = useState(false);

  return (
    <section className="about" id="about" aria-label="About Shantaram Divgi">
      <div className="title">
        <h2>About Me</h2>
      </div>

      <div className="content">
        <div
          className="photo-card"
          onClick={() => setFlip(!flip)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlip(!flip); }}
          title="Click to flip photo"
          aria-label="Click to flip portrait photo"
        >
          <div className={flip ? "photo-inner flip" : "photo-inner"}>
            {/* FRONT IMAGE */}
            <div className="photo-front">
              <img 
                src={`${import.meta.env.BASE_URL}img3.jpeg`} 
                alt="Portrait of Shantaram S Divgi" 
                loading="lazy" 
              />
            </div>

            {/* BACK IMAGE */}
            <div className="photo-back">
              <img 
                src={`${import.meta.env.BASE_URL}img4.png`} 
                alt="Alternate portrait of Shantaram S Divgi" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>

        <div className="text-about">
          <p>
            Hi, I'm <strong>Shantaram S Divgi (Ram)</strong>, an Artificial Intelligence and Machine Learning engineering undergraduate at Canara Engineering College. I build full-stack web, Generative AI, and RAG applications, turning complex engineering problems into practical, user-friendly software.
          </p>
          <br />
          <p>
            My work focuses on end-to-end software delivery—from simulation-backed digital twin modeling and vector search architectures to production-ready React and FastAPI dashboards. I focus on clean architecture, measurable performance, and real-world results.
          </p>
        </div>
      </div>

      <Skills />
    </section>
  );
}

export default About;
