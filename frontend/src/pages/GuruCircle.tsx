import { useState, useEffect } from "react";

interface Member {
  id: number;
  angle: number;
  ring: 1 | 2 | 3;
  img: string;
  name: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Position {
  x: number;
  y: number;
}

const members: Member[] = [
  { id: 1, angle: 140, ring: 1, img: "https://randomuser.me/api/portraits/men/32.jpg",   name: "Alex M."  },
  { id: 2, angle: 350, ring: 1, img: "https://randomuser.me/api/portraits/men/44.jpg",   name: "James K." },
  { id: 3, angle: 255, ring: 1, img: "https://randomuser.me/api/portraits/women/68.jpg", name: "Sola A."  },
  { id: 4, angle: 50,  ring: 2, img: "https://randomuser.me/api/portraits/men/55.jpg",   name: "Chris L." },
  { id: 5, angle: 185, ring: 2, img: "https://randomuser.me/api/portraits/men/73.jpg",   name: "Ryan T."  },
  { id: 6, angle: 310, ring: 2, img: "https://randomuser.me/api/portraits/men/81.jpg",   name: "Omar B."  },
  { id: 7, angle: 20,  ring: 3, img: "https://randomuser.me/api/portraits/women/45.jpg", name: "Nina R."  },
  { id: 8, angle: 155, ring: 3, img: "https://randomuser.me/api/portraits/men/62.jpg",   name: "David K." },
  { id: 9, angle: 275, ring: 3, img: "https://randomuser.me/api/portraits/women/33.jpg", name: "Zara M."  },
];

const features: Feature[] = [
  { icon: "✦", title: "Explore topics",   desc: "Explore our selection of courses in development"     },
  { icon: "✦", title: "Meet new friends", desc: "Join the network with million of students and learn" },
  { icon: "✦", title: "Learn code",       desc: "Learn all about code and become a developer"         },
];

const stats: Stat[] = [
  { value: "134",  label: "Active\nGurus"       },
  { value: "1.2K", label: "Total\nDiscussions"  },
  { value: "500",  label: "Completed\nProjects" },
  { value: "180",  label: "Job\nPostings"       },
];

// SVG viewBox is 0–100; rings expressed as % of that
const ringR: [number, number, number, number] = [0, 24, 36, 48];

function pol(deg: number, r: number): Position {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

export default function GuruCircle() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(155deg,#0d0b2e 0%,#080620 55%,#110935 100%)",
        fontFamily: "'Sora','DM Sans',sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow behind rings */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110vw",
          height: "110vw",
          maxWidth: "900px",
          maxHeight: "900px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle,rgba(100,55,230,0.2) 0%,transparent 62%)",
        }}
      />

      {/* ── ORBITAL SQUARE ── */}
      <div
        className="relative w-[95vw] md:w-[min(115vw,898px)]"
        style={{
          aspectRatio: "1 / 1",
          marginTop: "clamp(-20px, -2vw, -10px)",
          flexShrink: 0,
        }}
      >
        {/* SVG rings */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox="0 0 100 100"
          fill="none"
          overflow="visible"
        >
          {([ringR[1], ringR[2], ringR[3]] as number[]).map((r, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              stroke="#6644cc"
              strokeWidth="0.18"
              opacity={0.5 - i * 0.06}
            />
          ))}
        </svg>

        {/* Avatars */}
        {members.map((m, i) => {
          const { x, y } = pol(m.angle, ringR[m.ring]);
          return (
            <div
              key={m.id}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%,-50%)",
                transition: `opacity 480ms ${i * 60}ms, transform 480ms ${i * 60}ms`,
                opacity: mounted ? 1 : 0,
                zIndex: 10,
              }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  width: "clamp(36px,5.5vw,54px)",
                  height: "clamp(36px,5.5vw,54px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border:
                    hovered === m.id
                      ? "2.5px solid #8b5cf6"
                      : "2px solid rgba(255,255,255,0.22)",
                  boxShadow:
                    hovered === m.id
                      ? "0 0 0 3px rgba(139,92,246,0.35),0 4px 22px rgba(0,0,0,0.6)"
                      : "0 2px 14px rgba(0,0,0,0.5)",
                  transition: "all 180ms",
                  cursor: "pointer",
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {hovered === m.id && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: "-24px",
                    background: "#5b21b6",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 9px",
                    borderRadius: "20px",
                    whiteSpace: "nowrap",
                    zIndex: 20,
                  }}
                >
                  {m.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 🧠 Brain emoji */}
        <div
          style={{
            position: "absolute",
            left: `${pol(198, ringR[2]).x}%`,
            top: `${pol(198, ringR[2]).y}%`,
            transform: "translate(-50%,-50%)",
            fontSize: "clamp(22px,3.2vw,34px)",
            animation: "float 4s ease-in-out infinite",
            opacity: mounted ? 1 : 0,
            transition: "opacity 800ms 500ms",
            zIndex: 10,
          }}
        >
          🧠
        </div>

        {/* ★ 4.8 badge */}
        <div
          style={{
            position: "absolute",
            left: `${pol(332, ringR[3]).x}%`,
            top: `${pol(332, ringR[3]).y}%`,
            transform: "translate(-50%,-50%)",
            background: "rgba(255,255,255,0.09)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "20px",
            padding: "4px 11px",
            fontSize: "12px",
            fontWeight: 700,
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 600ms 400ms",
            zIndex: 10,
          }}
        >
          <span style={{ color: "#f5a623" }}>★</span> 4.8
        </div>

        {/* ── CENTER TEXT ── */}
        <div
          className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-[55%] w-[85%] md:w-[37%] text-center flex flex-col items-center z-[6] transition-opacity duration-600 delay-200"
          style={{
            gap: "clamp(6px,1vw,12px)",
            opacity: mounted ? 1 : 0,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1rem,2.5vw,1.7rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            <span style={{ color: "#c4b5fd" }}>Welcome To The</span>
            <br />
            <span style={{ color: "#7c3aed" }}>Guru Circle</span>
          </h1>
          <p
            className="text-[clamp(0.7rem,1.15vw,0.8rem)] md:text-[clamp(0.58rem,1.15vw,0.8rem)]"
            style={{
              color: "rgba(200,190,255,0.65)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Dive deep in immersive, interactive groups. Expand horizons, engage in
            discussions, and elevate your learning journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
            <button className="px-8 py-3 w-full sm:w-auto"
              style={{
                background: "#5b21b6",
                color: "white",
                border: "none",
                borderRadius: "7px",
                fontWeight: 700,
                fontSize: "clamp(0.65rem,1.05vw,0.78rem)",
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Get Started
            </button>
            <button className="px-8 py-3 w-full sm:w-auto"
              style={{
                background: "#0f0d25",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "7px",
                fontWeight: 700,
                fontSize: "clamp(0.65rem,1.05vw,0.78rem)",
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Guest Mode
            </button>
          </div>
        </div>

        {/* ── FEATURE CARDS ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-[clamp(6px,1vw,10px)] absolute -bottom-40 md:bottom-[13%] left-1/2 -translate-x-1/2 w-[90%] md:w-full z-[25] transition-opacity duration-700 delay-700"
          style={{
            opacity: mounted ? 1 : 0,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "rgba(8,6,28,0.92)",
                border: "1px solid rgba(120,80,255,0.22)",
                borderRadius: "12px",
                padding: "clamp(10px,1.6vw,18px) clamp(9px,1.3vw,14px)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div style={{ fontSize: "13px", color: "#8b5cf6", marginBottom: "6px" }}>
                {f.icon}
              </div>
              <p style={{ fontWeight: 700, fontSize: "clamp(10px,1.45vw,14px)", marginBottom: "5px" }}>
                {f.title}
              </p>
              <p style={{ fontSize: "clamp(9px,1.05vw,11px)", color: "rgba(180,170,220,0.65)", lineHeight: 1.55 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div
        className="flex flex-wrap justify-center gap-6 md:gap-[clamp(20px,5vw,72px)] w-full max-w-[min(88vw,760px)] px-6 pb-12 mt-48 md:mt-4 relative z-[30] transition-opacity duration-600 delay-900"
        style={{
          opacity: mounted ? 1 : 0,
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
            <span style={{ fontSize: "clamp(1.5rem,4.5vw,2.6rem)", fontWeight: 800, color: "white" }}>
              {s.value}
            </span>
            <span
              style={{
                fontSize: "clamp(9px,1.2vw,12px)",
                color: "rgba(180,170,220,0.6)",
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translate(-50%,-50%) translateY(0); }
          50%      { transform: translate(-50%,-50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}