import { FaStar } from "react-icons/fa";
import rec from "../learning-cohorts/images/Rectangle 1136.png"

const instructors = Array(5).fill({
  name: "Ronald Richards",
  role: "UI/UX Designer",
  students: "2400 Students",
  rating: "4.9",
  image: rec,
});

const TopInstructors = () => {
  return (
    <section className="mt-24">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-white text-xl font-semibold">Top Instructors</h2>
        <span className="text-sm text-gray-400 cursor-pointer">See All</span>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {instructors.map((inst, i) => (
          <div key={i} className="text-center">
            <img
              src={inst.image}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />

            <h3 className="text-white text-sm font-medium">
              {inst.name}
            </h3>

            <p className="text-xs text-gray-400 mb-2">
              {inst.role}
            </p>

            <div className="flex justify-center items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-yellow-400">
                <FaStar /> {inst.rating}
              </span>
              <span className="text-gray-400">{inst.students}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;