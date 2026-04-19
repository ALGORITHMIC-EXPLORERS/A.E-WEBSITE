import { useState } from "react";
import favicon from "../learning-cohorts/images/favicon.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-7xl relative">
        <div className="w-full flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">

          {/* LOGO */}
          <Link to="/" onClick={closeMenu}>
            <img src={favicon} className="w-10 h-10 rounded-full" alt="Logo" />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex gap-8 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/cohorts" className="text-white font-medium hover:text-purple-400 transition-colors">Cohorts</Link>
            <Link to="/modules" className="hover:text-white transition-colors">Modules</Link>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/guru-circle" className="hover:text-white transition-colors">Guru Circle</Link>
            <Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* PROFILE / LOGIN / HAMBURGER */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-4 items-center">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors border border-white/10">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button 
              className="lg:hidden text-2xl text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            <Link to="/dashboard" onClick={closeMenu} className="hidden sm:flex w-10 h-10 ml-2 rounded-full bg-purple-600 items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors">
              👤
            </Link>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:hidden flex flex-col gap-6 text-lg text-gray-300 animate-in fade-in slide-in-from-top-4 duration-300 z-40">
            <Link to="/" onClick={closeMenu} className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" onClick={closeMenu} className="hover:text-white transition-colors">About Us</Link>
            <Link to="/cohorts" onClick={closeMenu} className="text-white font-medium hover:text-purple-400">Cohorts</Link>
            <Link to="/modules" onClick={closeMenu} className="hover:text-white transition-colors">Modules</Link>
            <Link to="/products" onClick={closeMenu} className="hover:text-white transition-colors">Products</Link>
            <Link to="/guru-circle" onClick={closeMenu} className="hover:text-white transition-colors">Guru Circle</Link>
            <Link to="/testimonials" onClick={closeMenu} className="hover:text-white transition-colors">Testimonials</Link>
            <Link to="/contact" onClick={closeMenu} className="hover:text-white transition-colors">Contact</Link>
            
            <hr className="border-white/10" />
            
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={closeMenu} className="hover:text-white transition-colors">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="bg-white/10 text-center text-white py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/10">Sign Up</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/dashboard" onClick={closeMenu} className="hover:text-white transition-colors">Dashboard</Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-left text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;