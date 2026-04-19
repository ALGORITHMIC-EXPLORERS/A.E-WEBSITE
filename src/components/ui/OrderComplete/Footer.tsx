import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-25 pb-8 text-white">
      <div className="max-w-[1750px] mx-auto px-6 xl:px-12">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold mb-4">AE Learn.</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Work together seamlessly with real-time updates
              and communication.
            </p>
            <p className="text-gray-400">
              Team Conditional & Policy
            </p>
          </div>

          {/* Middle */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Help</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Latest Article</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Art & Design</li>
              <li className="hover:text-white cursor-pointer">Business</li>
              <li className="hover:text-white cursor-pointer">It & Solution</li>
              <li className="hover:text-white cursor-pointer">Programming</li>
            </ul>
          </div>

          {/* Logout */}
          <div className="flex items-start md:justify-end">
            <button
              type="button"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition"
            >
              Log Out
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 mb-10 max-w-7xl mx-auto"></div>

        {/* Bottom */}
        <p className="text-center text-gray-400 text-lg">
          ©ae. all right reserve
        </p>

      </div>
    </footer>
  );
};

export default Footer;