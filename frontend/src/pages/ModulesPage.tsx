import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lock, PlayCircle, BookOpen } from "lucide-react";

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

const placeholderModules = [
  {
    id: 1,
    title: "Introduction to Algorithmic Foundations",
    shortDescription: "Learn the core concepts of algorithms, data structures, and computational thinking.",
    estimatedMinutes: 120,
    isLocked: false,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Advanced Data Structures in TypeScript",
    shortDescription: "Master trees, graphs, and complex state management.",
    estimatedMinutes: 240,
    isLocked: true,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Full-stack System Design",
    shortDescription: "Architect scalable, fault-tolerant web applications from scratch.",
    estimatedMinutes: 300,
    isLocked: true,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "AI & Machine Learning Paradigms",
    shortDescription: "An introduction to neural networks and modern ML models.",
    estimatedMinutes: 180,
    isLocked: true,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ModulesPage() {
  return (
    <div className="relative overflow-hidden bg-[#050020] min-h-screen">
      <div
        className="w-full relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#050020]/60 pointer-events-none fixed" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24">
          
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-[0_8px_40px_rgba(120,40,255,0.25)] mb-6">
                Learning Modules
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Explore our comprehensive curriculum designed to take you from beginner to engineering expert.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {placeholderModules.map((mod, idx) => (
              <FadeInWhenVisible delay={0.1 * idx} key={mod.id}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 group flex flex-col h-full shadow-2xl">
                  
                  {/* Thumbnail area */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <img 
                      src={mod.thumbnail} 
                      alt={mod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#050020]/90 to-transparent" />
                    
                    {/* Floating metadata tag */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 py-1 px-3 rounded-full">
                      <BookOpen size={14} className="text-white/80" />
                      <span className="text-white/80 text-xs font-medium">{mod.estimatedMinutes} mins</span>
                    </div>

                    {/* Lock Overlay */}
                    {mod.isLocked && (
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-lg">
                        <Lock size={16} className="text-white/80" />
                      </div>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold text-white mb-3 line-clamp-2">
                      {mod.title}
                    </h2>
                    <p className="text-white/60 text-base leading-relaxed mb-8 flex-grow">
                      {mod.shortDescription}
                    </p>

                    {/* CTA Button */}
                    <button 
                      className={`w-full py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                        mod.isLocked 
                        ? 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10' 
                        : 'bg-linear-to-r from-[#7928FF] to-[#4C00FF] text-white shadow-[0_0_20px_rgba(120,40,255,0.3)] hover:shadow-[0_0_30px_rgba(120,40,255,0.5)] hover:-translate-y-1'
                      }`}
                    >
                      {mod.isLocked ? (
                        <>
                          <Lock size={18} />
                          Login to Start
                        </>
                      ) : (
                        <>
                          <PlayCircle size={18} />
                          Start Module
                        </>
                      )}
                    </button>
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
