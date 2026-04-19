import { useState } from "react";
import ellipse from "../course-details/images/Ellipse 4.png";
import { Star, Users, PlayCircle, ChevronDown } from "lucide-react";

export default function InstructorAndSyllabus() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const syllabus = [
    {
      title: "Introduction to UX Design",
      lessons: "5 Lessons • 1 hour",
      content: ["What is UX?", "History of UX", "UX vs UI", "Tools", "Case Study"],
    },
    {
      title: "Basics of User-Centered Design",
      lessons: "5 Lessons • 1 hour",
      content: ["User Research", "Personas", "Empathy Maps", "User Flows", "Testing"],
    },
    {
      title: "Elements of User Experience",
      lessons: "5 Lessons • 1 hour",
      content: ["Structure", "Scope", "Skeleton", "Surface", "Strategy"],
    },
    {
      title: "Visual Design Principles",
      lessons: "5 Lessons • 1 hour",
      content: ["Color", "Typography", "Layout", "Spacing", "Consistency"],
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleLessonClick = (lesson: string) => {
    console.log("Clicked lesson:", lesson);
    // 👉 You can route or trigger video here later
  };

  return (
    <section className="mt-10">

      {/* ================= INSTRUCTOR ================= */}
      <div className="border-t border-purple-800 pt-8">

        <h2 className="text-xl font-semibold mb-4">Instructor</h2>

        <h3 className="text-blue-400 font-semibold text-lg mb-1">
          Ronald Richards
        </h3>
        <p className="text-gray-400 text-sm mb-5">UI/UX Designer</p>

        <div className="flex gap-6 items-center mb-6">

          <img
            src={ellipse}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="space-y-2 text-sm text-gray-300">

            <div className="flex items-center gap-2">
              <Star size={16} className="text-purple-400" />
              <span>40,445 Reviews</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              <span>500 Students</span>
            </div>

            <div className="flex items-center gap-2">
              <PlayCircle size={16} className="text-purple-400" />
              <span>15 Courses</span>
            </div>

          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">
          With over a decade of industry experience, Ronald brings a wealth of
          practical knowledge to the classroom. He has played a pivotal role in
          designing user-centric interfaces for renowned tech companies, ensuring
          seamless and engaging user experiences.
        </p>
      </div>

      {/* ================= SYLLABUS ================= */}
      <div className="mt-12 border-t border-purple-800 pt-8">

        <h2 className="text-xl font-semibold mb-6">Syllabus</h2>

        <div className="border border-purple-700 rounded-xl">

          {syllabus.map((item, index) => (
            <div
              key={index}
              className="border-b border-purple-800 last:border-none"
            >

              {/* HEADER */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <div className="cursor-pointer hover:text-blue-400 flex items-center gap-3">
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                  <p>{item.title}</p>
                </div>

                <p className="text-gray-400 text-sm">{item.lessons}</p>
              </button>

              {/* DROPDOWN */}
              {openIndex === index && (
                <div className="px-10 pb-4 text-sm text-gray-300 space-y-2">

                  {item.content.map((lesson, i) => (
                    <button
                      key={i}
                      onClick={() => handleLessonClick(lesson)}
                      className="cursor-pointer block w-full text-left hover:text-blue-400 transition"
                    >
                      • {lesson}
                    </button>
                  ))}

                </div>
              )}

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}