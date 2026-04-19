import image4 from "..//course-details/images/image 4.png";
import { FaFacebookF, FaGithub, FaXTwitter, } from "react-icons/fa6";
import image from "../course-details/images/images-removebg-preview.png"
import download from "../course-details/images/download-removebg-preview.png"

export default function CourseSidebar() {
  return (
    <div className="mx-25 bg-[#190538] w-[400px] h-[588px] p-5 rounded-2xl border border-white/10">
      <img
        src={image4}
        className="rounded-xl mb-5"
      />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold">$49.5</span>
        <span className="line-through text-gray-400">$99</span>
        <span className="text-green-400">50% OFF</span>
      </div>

      <button className="w-full bg-purple-600 py-3 rounded-lg mb-3 hover:bg-purple-700 transition">
        Add To Cart
      </button>

      <button className="w-full border border-purple-600 py-3 rounded-lg mb-6 hover:bg-purple-600 transition">
        Buy Now
      </button>

      {/* Divider */}
      <div className="border-t border-white/10 mb-6"></div>

      {/* Share Section */}
      <p className="text-sm mb-4">Share</p>

    <div className="flex gap-6 justify-center">
     <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <FaFacebookF className="text-blue-600 text-lg" />
     </div>

     <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <FaGithub className="text-black text-lg" />
     </div>

     <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <img src={image} className="w-5 h-5 object-contain" />
     </div>

     <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <FaXTwitter className="text-black text-lg" />
     </div>

     <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <img src={download} className="w-5 h-5 object-contain" />
     </div>
    </div>
    </div>
  );
}