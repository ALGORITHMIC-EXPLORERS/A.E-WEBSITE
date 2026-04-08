import Navbar from "../components/ui/learning-cohorts/Navbar";
import Hero from "../components/ui/learning-cohorts/Hero";
import Stats from "../components/ui/learning-cohorts/Stats";
import TopCategories from "../components/ui/learning-cohorts/TopCategories";
import TopCourses from "../components/ui/learning-cohorts/TopCourses";
import TopInstructors from "../components/ui/learning-cohorts/TopInstructors";
import Testimonial from "../components/ui/learning-cohorts/Testimonial";
import CTAFooter from "../components/ui/learning-cohorts/CTAFooter";


export default function LearningCohort() {
  return (
    <div className="relative min-h-screen bg-[#050020] text-white overflow-hidden">

      {/* 🌌 GLOBAL BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* TOP GLOW */}
        <div className="absolute w-[900px] h-[900px] bg-purple-700/30 blur-[220px] top-[-300px] left-1/2 -translate-x-1/2" />

        {/* CENTER GLOW */}
        <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[200px] top-[40%] left-[20%]" />

        {/* RIGHT GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[180px] bottom-[10%] right-[10%]" />

      </div>

      {/* 🌐 CONTENT (ABOVE GLOW) */}
      <div className="relative z-10">

        <Navbar />

        <Hero />
        <Stats />

        {/* MAIN CONTENT */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            <TopCategories />
            <TopCourses />
            <TopInstructors />
            <Testimonial />
          </div>
        </section>

        <CTAFooter />

      </div>
    </div>
  );
}