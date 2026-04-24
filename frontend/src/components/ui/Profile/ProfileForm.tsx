export default function ProfileForm() {
  return (
    <div className="ml-[80px] border border-[#5F00FF] rounded-2xl p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border border-[#5F00FF] rounded px-3 py-2 w-[420px]"
          placeholder="Label"
        />
        <input
          className="border border-[#5F00FF] rounded px-3 py-2 w-[420px]"
          placeholder="Label"
        />
        <input
          className=" border border-[#5F00FF] rounded px-3 py-2 w-[420px]"
          placeholder="Label"
        />
      </div>

      <textarea
        className="border border-[#5F00FF] rounded px-3 py-2 w-[902px] h-24"
        placeholder="Label"
      />

      <div>
        <p className="text-sm mb-1 text-gray-400">Language</p>
        <select
          className="border border-[#5F00FF] rounded px-3 py-2 w-[420px]"
        >
          <option>Label</option>
        </select>
      </div>
    </div>
  );
}