import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>
            Senior Software Engineer with extensive experience in full-stack development using modern technologies. 
            Specialized in JavaScript, TypeScript, Python, and React ecosystem. Currently working at Tarjama, 
            developing comprehensive language services platforms and vendor management systems.
          </p>
          <p>
            Passionate about creating efficient, scalable solutions using domain-driven design principles, 
            machine learning integration, and real-time communication systems. Strong background in both 
            frontend and backend development with expertise in database design and API development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;