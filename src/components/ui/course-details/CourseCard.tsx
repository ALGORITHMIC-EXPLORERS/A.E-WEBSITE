import rectangle from "../course-details/images/Rectangle 1080.png"

export default function CourseCard() {
  return (
    <div className="w-[300px] bg-gradient-to-b from-[#1A1446] to-[#0B052C] p-[2px] rounded-2xl bor">

      {/* CARD */}
      <div className="bg-[#52405A] rounded-2xl p-3">

        {/* IMAGE */}
        <img
          src={rectangle}
          alt="Course"
          className="w-full h-[140px] object-cover rounded-lg mb-4"
        />

        {/* TITLE */}
        <h4 className="text-lg font-semibold text-white mb-1">
          Beginner’s Guide to Design
        </h4>

        {/* AUTHOR */}
        <p className="text-sm text-gray-400 mb-1">
          By Ronald Richards
        </p>

        {/* RATINGS */}
        <div className="flex items-center gap-2 mb-1">
          <div className="text-yellow-400 text-lg">
            ★★★★★
          </div>

          <span className="text-gray-300 text-sm">
            (1200 Ratings)
          </span>
        </div>

        {/* COURSE DETAILS */}
        <p className="text-sm text-gray-300 mb-1">
          22 Total Hours. 155 Lectures. Beginner
        </p>

        {/* PRICE */}
        <p className="text-xl font-bold text-white">
          $149.9
        </p>

      </div>
    </div>
  )
}