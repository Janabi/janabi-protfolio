import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python']
    },
    {
      title: 'Frontend Technologies',
      skills: ['ReactJS', 'Redux', 'HTML5', 'CSS3']
    },
    {
      title: 'Backend Technologies',
      skills: ['NodeJS', 'NestJS', 'Django REST Framework', 'FastAPI', 'Flask']
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Google Firebase', 'Redis']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'Docker', 'WebSocket', 'ZeroMQ', 'SocketIO']
    },
    {
      title: 'Operating Systems',
      skills: ['Linux', 'macOS']
    },
    {
      title: 'Specialized Skills',
      skills: ['Domain-Driven Design', 'Machine Learning', 'Semantic Search', 'API Development']
    }
  ];

  return (
    <section className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;