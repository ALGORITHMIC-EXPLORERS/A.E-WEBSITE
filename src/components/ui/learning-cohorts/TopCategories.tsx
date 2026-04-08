import briefcase from "../learning-cohorts/images/briefcase.png";
import code from "../learning-cohorts/images/code-browser.png";
import physics from "../learning-cohorts/images/physics.png";
import telescope from "../learning-cohorts/images/telescope.png";

import type { FC } from "react";

/* ================= TYPES ================= */
type Category = {
  title: string;
  courses: string;
  icon: string;
};

/* ================= DATA ================= */
const categories: Category[] = [
  { title: "ML & AI", courses: "11 Courses", icon: telescope },
  { title: "Development", courses: "12 Courses", icon: code },
  { title: "Marketing", courses: "12 Courses", icon: briefcase },
  { title: "Physics", courses: "14 Courses", icon: physics },
];

/* ================= COMPONENT ================= */
const TopCategories: FC = () => {
  return (
    <section className="mt-24">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-white text-xl font-semibold">
          Top Categories
        </h2>
        <span className="text-sm text-gray-400 cursor-pointer">
          See All
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-[#000000] rounded-xl py-8 flex flex-col items-center justify-center 
            transition duration-300 hover:scale-105"
          >

            {/* ICON CIRCLE */}
            <div
              className="w-[100px] h-[100px] flex items-center justify-center rounded-full 
              bg-gradient-to-r from-purple-900 to-purple-800 
              shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4"
            >
              <img
                src={cat.icon}
                alt={cat.title}
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* TEXT */}
            <h3 className="text-white font-medium">
              {cat.title}
            </h3>

            <p className="text-gray-400 text-sm">
              {cat.courses}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default TopCategories;