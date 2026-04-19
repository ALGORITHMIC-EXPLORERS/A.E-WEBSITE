import { FaStar } from "react-icons/fa";
import Rectangle from "../learning-cohorts/images/Rectangle 1080.png"

type Course = {
  title: string;
  author: string;
  price: string;
  image: string;
};

const courses: Course[] = Array(4).fill({
  title: "Beginner's Guide to Design",
  author: "Ronald Richards",
  price: "$149.9",
  image: Rectangle,
});

const TopCourses = () => {
  return (
    <section className="mt-24">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-white text-xl font-semibold">Top Courses</h2>
        <span className="text-sm text-gray-400 cursor-pointer">See All</span>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {courses.map((course, i) => (
          <div key={i} className="bg-[#0b0120] rounded-xl overflow-hidden">
            <img
              src={course.image}
              className="w-full h-36 object-cover"
            />

            <div className="p-4">
              <h3 className="text-white text-sm font-medium mb-1">
                {course.title}
              </h3>

              <p className="text-xs text-gray-400 mb-2">
                By {course.author}
              </p>

              <div className="flex items-center text-yellow-400 text-xs mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
                <span className="text-gray-400 ml-2">(1200 Ratings)</span>
              </div>

              <p className="text-xs text-gray-400 mb-2">
                22 Total Hours · 155 Lectures · Beginner
              </p>

              <p className="text-white font-semibold">{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCourses;