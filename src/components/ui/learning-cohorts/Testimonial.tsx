import { useEffect, useState } from "react";
import image from "../learning-cohorts/images/Frame 46.png";

const testimonials = [
  {
    name: "James Freshman",
    role: "Machine Learning Expert | Ghana, Africa",
    text: "Exceptional service! I couldn't be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.",
    image: image,
  },
  {
    name: "Sarah Kim",
    role: "Frontend Engineer | USA",
    text: "Amazing learning experience. The mentors truly care and guide you step by step.",
    image: image,
  },
  {
    name: "David Lee",
    role: "Backend Developer | UK",
    text: "This platform helped me gain real-world skills and confidence in coding.",
    image: image,
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  // ✅ FIXED INTERVAL (stable in React Strict Mode)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [index]); // 👈 important change

  const prev = (index - 1 + testimonials.length) % testimonials.length;
  const next = (index + 1) % testimonials.length;

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="max-w-2xl mb-20 text-left">
          <h2 className="text-5xl md:text-6xl font-semibold leading-tight">
            What our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">
              Explorers
            </span>
            <br />
            say about us
          </h2>
        </div>

        {/* SLIDER */}
        <div className="flex items-center justify-center gap-4 md:gap-6">

          {/* LEFT */}
          <div className="hidden md:flex flex-1 justify-end">
            <div className="w-[90%] opacity-30 scale-[0.97] blur-[0.5px] transition-all duration-500">
              <div className="bg-[#050020] p-5 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-gray-300 line-clamp-4">
                  {testimonials[prev].text}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex-[1.2] max-w-md relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-purple-600 blur-[90px] opacity-40 rounded-2xl"></div>

            <div className="relative bg-gradient-to-br from-[#050020] to-[#5F00FF] p-7 rounded-2xl border border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)]">

              <p className="text-base leading-relaxed text-white text-center mb-6">
                {testimonials[index].text}
              </p>

              <div className="flex items-center justify-center gap-3">
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    {testimonials[index].name}
                  </p>
                  <p className="text-xs text-cyan-300">
                    {testimonials[index].role}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex flex-1 justify-start">
            <div className="w-[90%] opacity-30 scale-[0.97] blur-[0.5px] transition-all duration-500">
              <div className="bg-purple-900/30 p-5 rounded-xl backdrop-blur-sm">
                <p className="text-sm text-gray-300 line-clamp-4">
                  {testimonials[next].text}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-10 gap-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[3px] rounded-full cursor-pointer transition-all duration-300 ${
                i === index
                  ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "w-3 bg-gray-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}