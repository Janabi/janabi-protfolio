import React from 'react';
import './Education.css';

const Education = () => {
  const education = [
    {
      degree: 'B.Sc. Chemical Engineering',
      institution: 'University of Jordan',
      location: 'Amman, Jordan',
      period: '2015 - 2020'
    },
    {
      degree: 'Certificate - Advanced Software Development in Full-Stack JavaScript',
      institution: 'LTUC - Abdul Aziz AlGurair Advanced Computing (ASAC)',
      location: 'Amman, Jordan',
      period: '2020 - March 2021'
    },
    {
      degree: 'Intensive English + Freshman + Sophomore Bio Pre-medicine',
      institution: 'American University of Beirut',
      location: 'Beirut, Lebanon',
      period: '2011 - 2014'
    }
  ];

  const certifications = [
    {
      title: 'TypeScript: The Complete Developer\'s Guide',
      year: '2022'
    },
    {
      title: 'Data Visualization by Python',
      provider: 'Codecademy',
      year: '2019'
    }
  ];

  return (
    <section className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="education-content">
          <div className="education-section">
            <h3 className="subsection-title">Formal Education</h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h4 className="degree">{edu.degree}</h4>
                    <span className="period">{edu.period}</span>
                  </div>
                  <div className="education-details">
                    <p className="institution">{edu.institution}</p>
                    <p className="location">{edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="education-section">
            <h3 className="subsection-title">Certifications & Courses</h3>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <h4 className="cert-title">{cert.title}</h4>
                  <div className="cert-details">
                    {cert.provider && <span className="cert-provider">{cert.provider}</span>}
                    <span className="cert-year">{cert.year}</span>
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

export default Education;