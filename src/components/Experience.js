import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tarjama',
      period: '2021 - Present',
      location: 'Amman, Jordan',
      description: [
        'Developed T-Portal, a comprehensive platform offering language services, content, and media options with real-time updates and flexible task management based on priority',
        'Built T-Vendor App for managing vendors offering diverse services and languages, with intelligent project assignment based on expertise',
        'Implemented domain-driven design principles in NodeJS applications',
        'Worked with Django REST Framework for backend API development',
        'Integrated machine learning and semantic search capabilities',
        'Developed real-time communication systems using WebSocket and ZeroMQ'
      ],
      technologies: ['JavaScript', 'TypeScript', 'Python', 'ReactJS', 'NodeJS', 'NestJS', 'Django REST Framework', 'PostgreSQL', 'MySQL', 'Redis', 'Machine Learning']
    }
  ];

  return (
    <section className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div className="experience-title">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                </div>
                <div className="experience-meta">
                  <span className="period">{exp.period}</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              <ul className="experience-description">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              <div className="experience-technologies">
                <h5>Technologies Used:</h5>
                <div className="tech-tags">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;