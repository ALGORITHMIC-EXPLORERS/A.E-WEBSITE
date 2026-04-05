export default function Button({text}) {
  return (
      <button
        className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-white text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #2d1b69 50%, #1e3a5f 100%)",
          border: "1px solid rgba(139, 92, 246, 0.45)",
          boxShadow: "0 0 24px rgba(109, 40, 217, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Hover glow overlay */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.25) 0%, rgba(59,130,246,0.15) 100%)",
          }}
        />

        {/* Arrow icon */}
        <span
          className="relative z-10 flex items-center justify-center w-5 h-5 rounded transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "rgba(167,139,250,0.9)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12L12 2M12 2H5M12 2V9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Label */}
        <span className="relative z-10" style={{ letterSpacing: "0.04em" }}>
          {text}
        </span>
      </button>
  );
}