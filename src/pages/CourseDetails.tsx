import Navbar from "../components/ui/course-details/Navbar";
import Footer from "../components/ui/course-details/Footer";
import CourseSidebar from "../components/ui/course-details/CourseSidebar";
import InstructorCard from "../components/ui/course-details/InstructorCard";
import ReviewSection from "../components/ui/course-details/ReviewSection";
import Testimonial from "../components/ui/course-details/Testimonial";
import CourseCard from "../components/ui/course-details/CourseCard";
import { useState } from "react";

export default function CourseDetails() {
  const [activeBreadcrumb, setActiveBreadcrumb] = useState<string>("home");

  return (
    <div className="bg-[#050020] text-white min-h-screen relative overflow-hidden">

      {/* 🌌 GLOBAL BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* TOP CENTER GLOW */}
        <div className="absolute w-[1000px] h-[1000px] bg-purple-700/20 blur-[250px] top-[-400px] right-[1200px] " />

        {/* LEFT FAINT GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[200px] top-[35%] left-[-150px]" />

        {/* MAIN RIGHT GLOW */}
        <div className="absolute w-[900px] h-[900px] bg-purple-600/30 blur-[220px] top-[45%] right-[-200px]" />

        {/* BOTTOM RIGHT INTENSE GLOW */}
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/30 blur-[200px] bottom-[-150px] right-[5%]" />

      </div>

      <Navbar />

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-[1750px] mx-auto px-6 py-12 grid grid-cols-12 gap-10 relative z-10">

        {/* LEFT SIDE */}
        <div className="col-span-8">

          {/* Breadcrumb */}
          <div className="flex items-center mb-6 text-sm">
            <button
              onClick={() => setActiveBreadcrumb("home")}
              className={`cursor-pointer transition ${
                activeBreadcrumb === "home"
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </button>

            <span className="text-gray-500 mx-3">›</span>

            <button
              onClick={() => setActiveBreadcrumb("categories")}
              className={`cursor-pointer transition ${
                activeBreadcrumb === "categories"
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Categories
            </button>

            <span className="text-gray-500 mx-3">›</span>

            <button
              onClick={() => setActiveBreadcrumb("course")}
              className={`cursor-pointer transition ${
                activeBreadcrumb === "course"
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Introduction to User Experience Design
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-inter font-bold mb-6">
            Introduction to User Experience Design
          </h1>

          {/* Description */}
          <p className="text-gray-300 mb-6 max-w-2xl">
            This course is meticulously crafted to provide you with a
            foundational understanding of the principles, methodologies,
            and tools that drive exceptional user experiences in the
            digital landscape.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3 text-sm mb-6 flex-wrap">
            <span className="text-yellow-400 font-semibold">4.6</span>
            <div className="flex text-yellow-400">★★★★★</div>
            <span className="text-gray-400">(651651 rating)</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">
              22 Total Hours. 155 Lectures. All levels
            </span>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
              alt="Instructor"
            />
            <p className="text-gray-300">
              Created by{" "}
              <span className="text-blue-400 cursor-pointer">
                Ronal Richards
              </span>
            </p>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 text-gray-300 mb-8">
            <span>🌐</span>
            <p>English, Spanish, Italian, German</p>
          </div>

          {/* DESCRIPTION */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-3 border-t border-purple-800 pt-5">
              Course Description
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              This immersive learning course will introduce you to User
              Experience (UX) design, the art of creating products and
              services that are intuitive, enjoyable, and user-friendly.
              Gain a solid foundation in UX principles and learn to apply
              them in real world scenarios through engaging modules and 
              interactive exercises.
            </p>

            <h2 className="text-xl font-semibold mb-3">
              Certification
            </h2>

            <p className="text-gray-300 leading-relaxed border-b border-purple-800 pb-5">
              At Byway, we understand the significance of formal recognition 
              for your hard work and dedication to continuous learning.
            </p>
          </section>

          {/* INSTRUCTOR */}
          <section className="mt-12">
            <InstructorCard />
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-4">
          <CourseSidebar />
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <section className="max-w-[1750px] mx-auto px-6 mt-14 relative z-10">
        <ReviewSection />
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-12 relative z-10">
        <Testimonial />
      </section>

      {/* MORE COURSES */}
      <section className="max-w-7xl mx-auto mt-24 px-6 relative z-10">
        <h3 className="text-xl font-semibold mb-8">
          More Courses Like This
        </h3>

        <div className="grid grid-cols-4 gap-6">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </section>

      <Footer />
    </div>
  );
}