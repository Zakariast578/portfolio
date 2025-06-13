import React, { useState } from "react";
import "./index.css";
import "./App.css";
import { LoadingScreen } from "./components/loadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Projects } from "./components/sections/Projects";
import { RevealOnScroll } from "./components/RevealOnScroll";
import emailjs from "emailjs-com";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
        <RevealOnScroll>
          <footer className="py-10 mt-12 border-t border-white/10 bg-gradient-to-t from-black/80 via-gray-900/60 to-transparent text-center">
            <p className="text-gray-400 text-base tracking-wide">
              © {new Date().getFullYear()} ZakariaSaid.dev. All rights reserved.
            </p>
          </footer>
        </RevealOnScroll>
      </div>
    </>
  );
}

export default App;
