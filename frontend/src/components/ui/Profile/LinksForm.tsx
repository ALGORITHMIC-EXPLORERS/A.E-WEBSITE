export default function LinksForm() {
  return (
    <div className="ml-[80px] border border-[#5F00FF] rounded-xl p-6 space-y-4">
      <p className="font-semibold">Links</p>

      {[
        "Website",
        "X (formerly twitter)",
        "LinkedIn",
        "YouTube",
        "Facebook",
      ].map((item) => (
        <div key={item}>
          <p className="text-xs text-white mb-1">{item}</p>
          <input className="border border-[#5F00FF] rounded w-[887px] px-3 py-2 input " placeholder="Label" />
        </div>
      ))}
    </div>
  );
}