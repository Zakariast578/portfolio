import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen bg-[rgba(10,10,10,0.95)] z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out
            ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            md:hidden`}
        >
            <button
                className="absolute top-4 right-6 text-white text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
            >
                &times;
            </button>
            <ul className="space-y-3 text-center mt-10 w-full px-2 font-inter">
                <li>
                    <a href="#home" className={`nav-underline block text-xl font-medium text-gray-300 py-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm active:scale-95 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} onClick={() => setMenuOpen(false)} aria-label="Home">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#about" className={`nav-underline block text-xl font-medium text-gray-300 py-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm active:scale-95 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} onClick={() => setMenuOpen(false)} aria-label="About">
                        About
                    </a>
                </li>
                <li>
                    <a href="#projects" className={`nav-underline block text-xl font-medium text-gray-300 py-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm active:scale-95 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} onClick={() => setMenuOpen(false)} aria-label="Projects">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#contact" className={`nav-underline block text-xl font-medium text-gray-300 py-2 rounded-lg focus:outline-none transition-all duration-200 shadow-sm active:scale-95 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} onClick={() => setMenuOpen(false)} aria-label="Contact">
                        Contact
                    </a>
                </li>
            </ul>
        </div>
    );
}

// Add to your global CSS:
// .nav-underline {
//   position: relative;
//   transition: color 0.2s;
// }
// .nav-underline::after {
//   content: '';
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: -2px;
//   height: 2px;
//   background: #f59e42; /* Tailwind yellow-600 */
//   border-radius: 2px;
//   transform: scaleX(0);
//   transition: transform 0.2s;
// }
// .nav-underline:hover::after, .nav-underline:focus::after {
//   transform: scaleX(1);
// }