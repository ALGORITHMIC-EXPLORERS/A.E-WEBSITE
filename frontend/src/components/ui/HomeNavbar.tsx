import { useState } from "react";
import favicon from "../ui/learning-cohorts/images/favicon.png";

function Navbar() {
  const [active, setActive] = useState("Home");

  const links = [
    "Home",
    "Learn",
    "Guru Circle",
    "Volunteer",
    "Projects",
    "AE News",
    "Exco Team",
    "Research Lab",
    "Testimonials",
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">

        {/* LOGO */}
        <img src={favicon} alt="logo" className="w-10 h-10 rounded-full" />

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 text-sm">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setActive(link)}
              className={`cursor-pointer transition-all duration-200 ${
                active === link
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-3">
          <button className="cursor-pointer px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded-full transition">
            Sign Up
          </button>

          <button className="cursor-pointer px-5 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-full transition">
            Log In
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;