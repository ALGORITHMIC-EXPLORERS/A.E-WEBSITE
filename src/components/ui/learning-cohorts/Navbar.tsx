import favicon from "../learning-cohorts/images/favicon.png";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">

      <div className="w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">

        {/* LOGO */}
        <img src={favicon} className="w-10 h-10 rounded-full" />

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#">Home</a>
          <a href="#" className="text-white font-medium">Learn</a>
          <a href="#">Guru Circle</a>
          <a href="#">Volunteer</a>
          <a href="#">Projects</a>
          <a href="#">AE News</a>
          <a href="#">Exco Team</a>
          <a href="#">Research Lab</a>
          <a href="#">Testimonials</a>
        </nav>

        {/* PROFILE */}
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          👤
        </div>

      </div>
    </header>
  );
}

export default Navbar;