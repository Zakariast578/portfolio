import React, { useState } from "react";
import "./index.css";
// ...existing code...
import Navbar from "./components/Navbar";
import Skills from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";

// ...existing code...

function App() {
  return (
    <>
    <div>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />     
    </div>
    </>
  );
}

export default App;
