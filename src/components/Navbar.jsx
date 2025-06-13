import React, { useEffect } from 'react';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-inter text-2xl font-extrabold tracking-wide text-white focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Home (ZakariaSaid.dev)">
                        ZakariaSaid<span className="text-blue-500">.dev</span>
                    </a>
                    {/* mobile menu icon */}
                    <div className="w-7 h-5 relative cursor-pointer z-40 md:hidden" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Open menu" tabIndex={0} role="button" onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && setMenuOpen(prev => !prev)}>
                        &#9776;
                    </div>
                    {/* desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="nav-underline text-gray-100 " aria-label="Home">Home</a>
                        <a href="#about" className="nav-underline text-gray-100 focus:outline-none" aria-label="About">About</a>
                        <a href="#projects" className="nav-underline text-gray-100 focus:outline-none" aria-label="Projects">Projects</a>
                        <a href="#contact" className="nav-underline text-gray-100 focus:outline-none" aria-label="Contact">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
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