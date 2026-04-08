import favicon from "../learning-cohorts/images/favicon.png";
import { FiSearch } from "react-icons/fi";

function Hero() {
  const categoriesLeft = [
    "UI/UX & Product Design",
    "Backend Development",
    "Frontend Development",
  ];

  const categoriesRight = [
    "Machine Learning",
    "Computational Analysis",
    "Algorithmic Basics",
  ];

  return (
    <section className="w-full pt-52 pb-32 relative overflow-hidden flex justify-center bg-[#050020]">

      {/* ✅ SMOOTH BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#050020] opacity-30 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl px-6 text-center">

        {/* ✅ TITLE FIXED */}
        <h1 className="text-6xl md:text-7xl font-Plus Jakarta Sans font-semibold leading-[1.2] pb-2 mb-4 bg-gradient-to-r from-[#050040] to-[#6635C4] text-transparent bg-clip-text">
          Learning Cohorts
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm mb-12 max-w-md mx-auto leading-relaxed">
          Phasellus accumsan imperdiet tempor. <br />
          Cras tincidunt, arcu nec eleifend porttitor, orci est vehicula
        </p>

        {/* SEARCH */}
        <div className="flex justify-center items-center gap-4 mb-24">

          <input
            placeholder="Search for a course"
            className="w-[500px] px-6 py-4 rounded-xl 
            bg-gradient-to-r from-[#060221] to-[#201239] 
            border border-purple-500/30 
            font-normal text-[#407199] 
            outline-none 
            shadow-[inset_0_0_20px_rgba(2,48,83,1),0_0_20px_rgba(168,85,247,0.15)]"
          />

          <button className="w-14 h-14 rounded-xl flex items-center justify-center 
          bg-gradient-to-br from-[#1b0c3b] to-[#0b0620] 
          border border-purple-500/30 
          shadow-[inset_0_0_20px_rgba(2,48,83,1),0_0_20px_rgba(168,85,247,0.15)]">
            <FiSearch className="text-[#407199] text-lg" />
          </button>

        </div>

        {/* CATEGORY ROW */}
        <div className="flex justify-center items-center gap-14">

          {/* LEFT */}
          {categoriesLeft.map((cat, i) => (
            <div key={i} className="flex flex-col items-center w-[130px] ">
              <div className="w-14 h-14 rounded-full bg-[#FFFFFF] mb-3 " />
              <p className="text-xs text-gray-400 text-center leading-tight">
                {cat}
              </p>
            </div>
          ))}

          {/* CENTER HERO ICON */}
          <div className="relative mx-8">

            {/* REFINED GLOW */}
            <div className="absolute w-[310px] h-[310px] bg-purple-600 blur-[140px] opacity-70 rounded-full" />

            {/* OUTER RING */}
            <div className="w-[291px] h-[291px] rounded-full bg-purple-500/20 flex items-center justify-center">

              {/* INNER WHITE */}
              <div className="w-[245px] h-[245px] bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.6)]">

                <img src={favicon} className="w-30 h-30 rounded-full" />

              </div>
            </div>

          </div>

          {/* RIGHT */}
          {categoriesRight.map((cat, i) => (
            <div key={i} className="flex flex-col items-center w-[130px]">
              <div className="w-14 h-14 rounded-full bg-[#FFFFFF] mb-3" />
              <p className="text-xs text-gray-400 text-center leading-tight">
                {cat}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Hero;