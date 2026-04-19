import ellipse19 from "../course-details/images/Ellipse 19.png";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  const reviews = [1, 2, 3];

  return (
    <section className="w-full mt-14">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-10">Learner Reviews</h2>

      {/* FLEX CONTAINER */}
      <div className="flex w-full">

        {/* ================= LEFT: RATINGS ================= */}
        <div className="w-[300px] space-y-6">

          {/* Overall */}
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={18} fill="currentColor" />
            <span className="text-lg font-semibold">4.6</span>
            <span className="text-gray-400 text-sm">146,951 reviews</span>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            {ratings.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">

                {/* Stars */}
                <div className="flex text-yellow-400 text-sm w-[90px]">
                  {"★".repeat(item.stars)}
                  <span className="text-gray-600">
                    {"★".repeat(5 - item.stars)}
                  </span>
                </div>

                {/* Bar */}
                <div className="flex-1 h-2 bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                {/* % */}
                <span className="text-gray-400 text-sm w-[40px]">
                  {item.percent}%
                </span>

              </div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT: COMMENTS ================= */}
        <div className="ml-auto w-[900px] space-y-6">

          {reviews.map((_, index) => (
            <div
              key={index}
              className="border border-purple-800 rounded-2xl p-6 flex gap-5"
            >

              {/* Avatar */}
              <img
                src= {ellipse19}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Content */}
              <div className="flex-1">

                {/* Top Row */}
                <div className="flex items-center justify-between mb-2 flex-wrap">

                  {/* Name */}
                  <p className="font-semibold">Mark Doe</p>

                  {/* Rating + Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Star
                      size={16}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                    <span className="text-white font-medium">5</span>
                    <span>Reviewed on 22nd March, 2024</span>
                  </div>

                </div>

                {/* Comment */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  I was initially apprehensive, having no prior design
                  experience. But the instructor, John Doe, did an amazing job
                  of breaking down complex concepts into easily digestible
                  modules. The video lectures were engaging, and the real-world
                  examples really helped solidify my understanding.
                </p>

              </div>
            </div>
          ))}

          {/* Button */}
          <button className="border border-gray-500 px-6 py-2 rounded-lg text-sm hover:border-white transition">
            View more Reviews
          </button>

        </div>

      </div>

    </section>
  );
}