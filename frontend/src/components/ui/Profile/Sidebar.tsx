import image from "../Profile/Images/Ellipse 53.png";
import { useState } from "react";

export default function Sidebar() {
const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="ml-[80px] w-[290px] h-[607px] rounded-2xl bg-[#5F00FF] p-4">
      <div className="mt-[10px] flex flex-col items-center">
        <img
          src= {image}
          className="rounded-full mb-3 border-2 border-white"
        />
        <p className="font-semibold">John Doe</p>

        <button className="mt-[20px] bg-white text-purple-700 text-sm px-4 py-1 rounded-lg hover:bg-gray-200 cursor-pointer">
          Share Profile
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {[
          "Profile",
          "My Courses",
          "Teachers",
          "Messages",
          "My Reviews",
      ].map((item, i) => (
        <div
          key={item}
          onClick={() => setActiveIndex(i)}
          className={`p-2 rounded cursor-pointer ${
          activeIndex === i
            ? "bg-purple-600"
            : "hover:bg-purple-600"
          }`}
  >
    {item}

          </div>
        ))}
      </div>
    </div>
  );
}