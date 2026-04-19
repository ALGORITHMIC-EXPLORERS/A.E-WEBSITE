import courseImage from "../ShoppingCart/Images/image 4.png";

export default function CartItem() {
  return (
    <div className="flex justify-between items-start bg-[#190538] border border-white rounded-lg px-6 py-5">

      <div className="flex gap-5">

        {/* COURSE IMAGE */}
        <img
          src={courseImage}
          alt="Course Thumbnail"
          className="w-[210px] h-[130px] object-cover rounded"
        />

        <div>
          <h3 className="font-semibold text-lg">
            Introduction to User Experience Design
          </h3>

          <p className="text-sm text-gray-400">
            By John Doe
          </p>

          <div className="flex items-center text-sm mt-1">
            <span className="text-yellow-400 mr-2">
              4.6 ★★★★★
            </span>

            <span className="text-gray-400">
              (250 rating)
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            22 Total Hours · 155 Lectures · All levels
          </p>

          <div className="text-xs mt-2">
            <button className="cursor-pointer text-blue-400 mr-3 hover:underline">
              Save for later
            </button>

            <button className="cursor-pointer text-red-400 hover:underline">
              Remove
            </button>
          </div>

        </div>
      </div>

      <div className="text-lg font-semibold">
        $45.00
      </div>

    </div>
  );
}