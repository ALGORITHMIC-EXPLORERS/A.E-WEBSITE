import { useEffect, useState } from "react";
import image from "../learning-cohorts/images/Frame 46.png";

const testimonials = [
  {
    name: "James Freeman",
    role: "Machine Learning Expert | Ghana, Africa",
    text: "Exceptional service! I couldn't be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.",
    image: image,
  },
  {
    name: "James Freshman",
    role: "Machine Learning Expert | Ghana, Africa",
    text: "Exceptional service! I couldn't be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.",
    image: image,
  },
  {
    name: "James Doe",
    role: "Machine Learning Expert | Ghana, Africa",
    text: "Exceptional service! I couldn't be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.",
    image: image,
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prev = (index - 1 + testimonials.length) % testimonials.length;
  const next = (index + 1) % testimonials.length;

  const visible = [prev, index, next];

  return (
    <section className="py-32">
      <div className="max-w-[1750px] mx-auto px-6">

        {/* TITLE */}
        <div className="max-w-2xl mb-20 text-left">
          <h2 className="text-5xl md:text-6xl font-semibold leading-tight">
            What our <span className="text-purple-800">Explorers</span>
            <br />
            say about us
          </h2>
        </div>

        {/* SLIDER */}
        <div className="relative flex justify-center items-center">

          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-[#050020] to-transparent z-20"></div>

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-[#050020] to-transparent z-20"></div>

          <div className="flex items-center justify-center gap-8">

            {visible.map((itemIndex, i) => {
              const t = testimonials[itemIndex];
              const isCenter = i === 1;

              return (
                <div
                  key={itemIndex}
                  className={`relative max-w-md w-full transition-all duration-700
                  ${
                    isCenter
                      ? "opacity-100 scale-105"
                      : "opacity-40 scale-95"
                  }`}
                >

                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-700
                    ${
                      isCenter
                        ? "bg-gradient-to-br from-[#050020] to-[#5F00FF] px-7 py-10"
                        : "bg-[#050020] border border-cyan-400/40 px-7 py-7"
                    }`}
                  >

                    {/* CENTER GLOW */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-30"></div>
                    )}

                    <div className="relative z-10">

                      <p className="text-base leading-relaxed text-white text-center mb-6">
                        {t.text}
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-11 h-11 rounded-full object-cover"
                        />

                        <div className="text-left">
                          <p className="text-sm font-medium text-white">
                            {t.name}
                          </p>

                          <p className="text-xs text-cyan-300">
                            {t.role}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-10 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-cyan-400" : "w-3 bg-gray-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}