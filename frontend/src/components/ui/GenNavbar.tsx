import { useState } from "react";
import favicon from "../ui/learning-cohorts/images/favicon.png";

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("Learn");
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const links: string[] = [
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

  const toggleProfile = (): void => {
    setOpenProfile(!openProfile);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 relative">

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

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="cursor-pointer w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition"
          >
            👤
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-40 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden">

              <button className="cursor-pointer w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10">
                Log In
              </button>

              <button className="cursor-pointer w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10">
                Sign Up
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;