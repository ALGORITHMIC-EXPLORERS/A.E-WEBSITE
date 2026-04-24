import vector from "../Profile/Images/Vector (1).png";

export default function ImageUpload() {
  return (
    <div className="ml-[80px] border border-[#5F00FF] rounded-xl p-6">
      <p className="mb-3">Image Preview</p>
    <div className="w-64 h-44 border border-[#5F00FF] rounded-lg flex items-center justify-center">
      <button className="rounded mt-4 w-56 h-36 bg-gradient-to-br from-[#5F00FF] to-[#3A0080] flex items-center justify-center mb-4 cursor-pointer">
        <img src={vector} />
      </button>
    </div>
      

      <p className="text-sm text-white mt-3 mb-2">
        Add/Change Image
      </p>

      <div className="flex gap-4">
        <input
          className="border border-[#5F00FF] rounded w-[420px] px-3 py-2"
          placeholder="Label"
        />
        <button className="border border-[#5F00FF] rounded w-[200px] px-3 py-2 hover:bg-purple-600 cursor-pointer">
          Upload Image
        </button>
      </div>

      <button className="border border-[#5F00FF] rounded px-3 py-2 hover:bg-purple-600 cursor-pointer mt-4">
        Save Image
      </button>
    </div>
  );
}