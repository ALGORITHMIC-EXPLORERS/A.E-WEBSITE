import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const bgPath = "/background.jpg";

const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

const teamMembers = [
  {
    name: "Alex Doe",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years in EdTech, passionate about making AI accessible to everyone.",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Sarah Smith",
    role: "Head of Learning",
    bio: "Former university professor. Sarah designs curriculum that is engaging, modern, and highly effective.",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    name: "David Chen",
    role: "Lead Engineer",
    bio: "Tech enthusiast who ensures our platform scales gracefully completely bug-free.",
    image: "https://i.pravatar.cc/300?img=15",
  },
  {
    name: "Emily Taylor",
    role: "Community Manager",
    bio: "The heart of our discord and forums, ensuring every learner feels supported.",
    image: "https://i.pravatar.cc/300?img=49",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#050020] min-h-screen">
      <div
        className="w-full relative overflow-hidden"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Soft overlay for depth */}
        <div className="absolute inset-0 bg-[#050020]/60 pointer-events-none fixed" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24">
          
          {/* Header Section */}
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-[0_8px_40px_rgba(120,40,255,0.25)] mb-6">
                About AE
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Empowering the next generation of algorithmic thinkers and builders.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12 h-full shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#7928FF] to-[#4C00FF] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Our Mission</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  To democratize access to advanced technology education. We believe that by building an engaging, project-based platform, we can empower individuals worldwide to become creators, not just consumers, of the algorithms that shape our future.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12 h-full shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#FF28B5] to-[#7928FF] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Our Vision</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  We envision a world where anyone with an internet connection can acquire world-class algorithmic and software engineering skills. We are building the foundational learning OS for the AI-driven tech economy.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Team Section */}
          <FadeInWhenVisible delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Meet the Team</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The passionate individuals working tirelessly behind the scenes to make AE incredible.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <FadeInWhenVisible delay={0.4 + idx * 0.1} key={member.name}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-[#0F80DD] font-medium text-sm mb-4">{member.role}</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
