import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, MessageSquareQuote, Send } from "lucide-react";

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

const placeholderTestimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Frontend Engineer at TechCorp",
    content: "The algorithms module completely changed how I think about state management in React. The interactive visualizers make complex topics so simple to understand.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Computer Science Student",
    content: "I failed my data structures class twice before finding AE. The community support and step-by-step breakdowns finally made it click for me. I just landed an internship!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Michael Chang",
    role: "Indie Hacker",
    content: "The system design modules are worth their weight in gold. Real-world architectural patterns explained clearly.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=14"
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Engineering Manager",
    content: "Our entire junior dev team uses AE to upskill. The rigorous curriculum is better than most expensive bootcamps.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47"
  }
];

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", role: "", content: "", rating: 5 });
    }, 3000);
  };

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
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-[0_8px_40px_rgba(120,40,255,0.25)] mb-6">
                Community Voices
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Read what thousands of engineers are saying about their journey with Algorithmic Explorers.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Reviews Masonry/Grid (Left Side) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {placeholderTestimonials.map((testimonial, idx) => (
                <FadeInWhenVisible delay={0.1 * idx} key={testimonial.id}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col">
                    <MessageSquareQuote size={32} className="text-[#7928FF]/40 mb-4" />
                    <p className="text-white/80 text-lg leading-relaxed flex-grow italic mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-white/10" 
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-white/50 text-sm">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} 
                        />
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Submission Form (Right Side) */}
            <div className="lg:col-span-1">
              <FadeInWhenVisible delay={0.4}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sticky top-32">
                  <h3 className="text-2xl font-semibold text-white mb-2">Share Your Story</h3>
                  <p className="text-white/60 text-sm mb-8">Your feedback gets reviewed and might be featured on our wall of love.</p>

                  {isSubmitted ? (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="text-green-400" size={20} />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Submitted Successfully!</h4>
                      <p className="text-green-200/70 text-sm">Thank you for sharing your experience with us.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7928FF] transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Role & Company</label>
                        <input 
                          type="text" 
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7928FF] transition-colors"
                          placeholder="Software Engineer at ACME"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Your Review</label>
                        <textarea 
                          required
                          rows={4}
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7928FF] transition-colors resize-none"
                          placeholder="How did AE help you?"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({...formData, rating: star})}
                              className="focus:outline-none hover:scale-110 transition-transform"
                            >
                              <Star size={24} className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 bg-linear-to-r from-[#7928FF] to-[#4C00FF] text-white font-semibold shadow-[0_0_20px_rgba(120,40,255,0.3)] hover:shadow-[0_0_30px_rgba(120,40,255,0.5)] transition-all"
                      >
                        <Send size={18} />
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </FadeInWhenVisible>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
