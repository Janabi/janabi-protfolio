import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
    </div>
  );
}

export default App;
