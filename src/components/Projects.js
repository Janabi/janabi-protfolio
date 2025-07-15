import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'T-Portal (Tarjama)',
      description: 'An encompassing platform that offers a range of language services as well as content and media options to users in a smooth and efficient manner, with real-time updates and the flexibility to manage tasks based on priority.',
      technologies: ['JavaScript', 'TypeScript', 'Python', 'MySQL', 'PostgreSQL', 'Django REST Framework', 'NestJS', 'ReactJS', 'Redux', 'NodeJS', 'FastAPI', 'Flask', 'Redis', 'WebSocket', 'ZeroMQ', 'Domain-Driven Design', 'Semantic Search', 'Machine Learning'],
      type: 'Professional'
    },
    {
      title: 'T-Vendor App (Tarjama)',
      description: 'A platform for managing vendors offering diverse services and languages, and assigning them to projects according to their expertise.',
      technologies: ['TypeScript', 'Python', 'Flask', 'FastAPI', 'Machine Learning', 'Semantic Search', 'Domain-Driven Design', 'ReactJS', 'PostgreSQL'],
      type: 'Professional'
    },
    {
      title: 'Laptoptory App',
      description: 'Web app is an inventory management system that tracks all the information related to getting or returning a laptop from or to student/employee.',
      technologies: ['PostgreSQL', 'MongoDB', 'NodeJS', 'SocketIO', 'ReactJS', 'Redux'],
      type: 'Personal'
    },
    {
      title: 'Git Content App',
      description: 'A multi-source API-powered app offering photo, video, and GIF search capabilities, allowing users to create accounts, save favorites, and benefit from a complete login system and optimized database structure.',
      technologies: ['NodeJS', 'Mustache', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
      type: 'Personal'
    }
  ];

  const packages = [
    {
      name: 'validator-utils-js',
      description: 'A flexible and lightweight JavaScript validation library for handling common data validation tasks such as validating strings, numbers, dates, and booleans. It provides simple chainable methods to validate and customize various input types efficiently.',
      type: 'NPM Package'
    },
    {
      name: 'undetectable-ai',
      description: 'This Node.js module simplifies interaction with the Undetectable AI Detection API. It allows developers to easily detect AI-generated text within their applications.',
      type: 'NPM Package'
    }
  ];

  return (
    <section className="projects">
      <div className="container">
        <h2 className="section-title">Projects & Packages</h2>
        
        <div className="projects-content">
          <div className="projects-section">
            <h3 className="subsection-title">Projects</h3>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                    <span className={`project-type ${project.type.toLowerCase()}`}>
                      {project.type}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    <h5>Technologies:</h5>
                    <div className="tech-tags">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="packages-section">
            <h3 className="subsection-title">Published Packages</h3>
            <div className="packages-grid">
              {packages.map((pkg, index) => (
                <div key={index} className="package-card">
                  <div className="package-header">
                    <h4 className="package-title">{pkg.name}</h4>
                    <span className="package-type">{pkg.type}</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  <div className="package-links">
                    <a 
                      href={`https://www.npmjs.com/package/${pkg.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="package-link"
                    >
                      View on NPM
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;