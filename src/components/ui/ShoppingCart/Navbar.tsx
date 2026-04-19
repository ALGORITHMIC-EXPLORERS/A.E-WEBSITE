import { FiSearch, FiHeart, FiShoppingCart, FiBell } from "react-icons/fi";
import favicon from "../course-details/images/favicon.png";

const Navbar: React.FC = () => {
  return (
    <header className="w-full">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between py-4 px-6">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-8">

          <img
            src={favicon}
            alt="AE Learn"
            className="w-[106px] h-[80.7px]"
          />

          <div className="flex items-center gap-8 px-6">

            <button className="text-gray-300 weight-400px hover:text-white transition cursor-pointer">
              AE Learn
            </button>

            <button className="text-gray-300 weight-400px hover:text-white transition cursor-pointer">
              Categories
            </button>

          </div>

          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder="Search for a course"
              className="w-[510px] h-[60px] px-5 py-2 rounded-xl
              bg-gradient-to-r from-[#060221] to-[#201239]
              text-sm text-[#9fb3d1]
              outline-none
              shadow-[inset_0_0_20px_rgba(2,48,83,1),0_0_20px_rgba(168,85,247,0.15)]"
            />

            <button
              className="w-[60px] h-[60px] rounded-xl flex items-center justify-center
              bg-gradient-to-br from-[#1b0c3b] to-[#0b0620]
              shadow-[inset_0_0_20px_rgba(2,48,83,1),0_0_20px_rgba(168,85,247,0.15)]
              cursor-pointer"
            >
              <FiSearch className="text-[#9fb3d1]" />
            </button>

          </div>

        </div>

        <div className="flex items-center gap-6 w-[348px] h-[90px] justify-between px-16 py-6 rounded-full bg-white/5 backdrop-blur-xl">

          <FiHeart className="text-gray-300 cursor-pointer hover:text-white" size={20} />
          <FiShoppingCart className="text-gray-300 cursor-pointer hover:text-white" size={20} />
          <FiBell className="text-gray-300 cursor-pointer hover:text-white" size={20} />

          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
            G
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;