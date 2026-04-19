import React, { useRef, useState } from "react";
import { FaPlay, FaStar, FaChevronDown, FaChevronUp, FaUserGraduate } from "react-icons/fa";

export default function CoursePage() {
  const videoRef = useRef(null);

  // 🔹 NEW: Courses dummy data
  const courses = Array(6).fill({
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
    price: "$149.9",
    rating: 5,
    reviews: 1200,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
  });

  // 🔹 NEW: Reviews dummy data
  const reviews = [
    { name: "Mark Doe", rating: 5, date: "22nd March, 2024", text: "Amazing breakdown of complex concepts." },
    { name: "Eden Doe", rating: 4, date: "21st March, 2024", text: "Very engaging lectures." },
    { name: "Jonathan Doe", rating: 5, date: "15th March, 2024", text: "Highly recommend!" },
  ];

  const StarRating = ({ count }) => (
    <div className="flex text-yellow-400 text-sm">
      {Array(5).fill(0).map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );

  // 🔹 ORIGINAL CODE (UNCHANGED)
  const [sections, setSections] = useState([
    {
      title: "Introduction to UX Design",
      open: true,
      lessons: [
        { id: 1, title: "What is UX Design?", src: "https://www.w3schools.com/html/mov_bbb.mp4", completed: false },
        { id: 2, title: "History of UX", src: "https://www.w3schools.com/html/movie.mp4", completed: false },
        { id: 3, title: "User-Centered Design", src: "https://www.w3schools.com/html/mov_bbb.mp4", completed: false },
        { id: 4, title: "Role of UX", src: "https://www.w3schools.com/html/movie.mp4", completed: false },
        { id: 5, title: "UX Tools", src: "https://www.w3schools.com/html/mov_bbb.mp4", completed: false },
      ],
    },
    {
      title: "Basics of User-Centered Design",
      open: false,
      lessons: [
        { id: 6, title: "User Needs", src: "https://www.w3schools.com/html/movie.mp4", completed: false },
        { id: 7, title: "Personas", src: "https://www.w3schools.com/html/mov_bbb.mp4", completed: false },
      ],
    },
    {
      title: "Elements of User Experience",
      open: false,
      lessons: [
        { id: 8, title: "Structure", src: "https://www.w3schools.com/html/movie.mp4", completed: false },
      ],
    },
    {
      title: "Visual Design Principles",
      open: false,
      lessons: [
        { id: 9, title: "Color Theory", src: "https://www.w3schools.com/html/mov_bbb.mp4", completed: false },
      ],
    },
  ]);

  const [current, setCurrent] = useState({ sectionIndex: 0, lessonIndex: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const currentLesson = sections[current.sectionIndex].lessons[current.lessonIndex];

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleEnded = () => {
    const updated = [...sections];
    updated[current.sectionIndex].lessons[current.lessonIndex].completed = true;
    setSections(updated);
    setIsPlaying(false);
  };

  const toggleSection = (index) => {
    const updated = [...sections];
    updated[index].open = !updated[index].open;
    setSections(updated);
  };

  const selectLesson = (sectionIndex, lessonIndex) => {
    setCurrent({ sectionIndex, lessonIndex });
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#050020] text-white px-6 md:px-16 py-10">
      <h1 className="text-lg mb-6 text-gray-300">Introduction to UX Design</h1>

      {/* 🔹 ORIGINAL GRID (UNCHANGED) */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-8">
          {/* VIDEO */}
          <div className="relative rounded-xl overflow-hidden">
            <video
              key={currentLesson.src}
              ref={videoRef}
              className="w-full h-[500px] object-cover"
              onEnded={handleEnded}
              controls={isPlaying}
            >
              <source src={currentLesson.src} type="video/mp4" />
            </video>

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="bg-purple-600 p-4 rounded-full hover:scale-110 transition"
                >
                  <FaPlay />
                </button>
              </div>
            )}
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-4">
            {["Details", "Instructor", "Courses", "Reviews"].map((btn) => (
              <button key={btn} className="px-6 py-2 bg-[#5F00FF] text-[#E4DCDC] rounded-lg">
                {btn}
              </button>
            ))}
          </div>

          {/* COURSE OVERVIEW + INSTRUCTOR (UNCHANGED) */}
          <div className="space-y-6">
            {/* your existing content untouched */}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/5 w-full md:w-[90%] mx-auto rounded-xl p-4 border border-white/10 h-fit">
          <h2 className="mb-4 font-semibold">Course Completion</h2>

          {sections.map((section, sIndex) => (
            <div key={sIndex} className="mb-3">
              <div
                onClick={() => toggleSection(sIndex)}
                className="flex justify-between items-center cursor-pointer bg-white/5 p-3 rounded-lg"
              >
                <span className="text-sm">{section.title}</span>
                {section.open ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {section.open && (
                <div className="mt-2 space-y-2">
                  {section.lessons.map((lesson, lIndex) => (
                    <div
                      key={lesson.id}
                      onClick={() => selectLesson(sIndex, lIndex)}
                      className={`p-2 text-xs flex justify-between items-center rounded-md cursor-pointer ${
                        current.sectionIndex === sIndex && current.lessonIndex === lIndex
                          ? "bg-purple-600"
                          : "bg-white/5"
                      }`}
                    >
                      <span>{lesson.title}</span>
                      <input
                        type="checkbox"
                        checked={lesson.completed}
                        readOnly
                        className="accent-purple-600"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 NEW: MORE COURSES (FULL WIDTH) */}
      <div className="mt-14">
        <h2 className="mb-4">
          More Courses by <span className="text-purple-400">Ronald Richards</span>
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {courses.map((course, idx) => (
            <div key={idx} className="min-w-[260px] bg-[#1a1633] p-3 rounded-xl">
              <img src={course.image} className="h-32 w-full object-cover rounded" />
              <h3 className="mt-2 text-sm">{course.title}</h3>
              <p className="text-xs text-gray-400">By {course.author}</p>

              <div className="flex items-center gap-2">
                <StarRating count={course.rating} />
                <span className="text-xs text-gray-400">({course.reviews})</span>
              </div>

              <p className="mt-2 font-bold">{course.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 NEW: REVIEWS (FULL WIDTH) */}
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold">Learner Reviews</h3>
          <p className="text-xl font-bold">4.6</p>
          <p className="text-sm text-gray-400">146,951 reviews</p>
        </div>

        <div className="md:col-span-2 space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#1a1633] p-4 rounded-xl">
              <div className="flex justify-between">
                <p>{r.name}</p>
                <StarRating count={r.rating} />
              </div>
              <p className="text-xs text-gray-400">Reviewed on {r.date}</p>
              <p className="text-sm mt-2 text-gray-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
