import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
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
                Get in Touch
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Have questions about the cohort or need help with your account? We're here for you.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Information */}
            <div>
              <FadeInWhenVisible delay={0.1}>
                <h2 className="text-3xl font-semibold text-white mb-8">Reach Out Directly</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                      <Mail className="text-[#0F80DD]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-medium mb-1">Email Us</h4>
                      <p className="text-white/60 mb-2">Our friendly team is here to help.</p>
                      <a href="mailto:hello@algorithmicexplorers.com" className="text-[#0F80DD] hover:text-white transition-colors">hello@algorithmicexplorers.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                      <MapPin className="text-[#7928FF]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-medium mb-1">Global HQ</h4>
                      <p className="text-white/60 mb-2">Based in SF, operating globally.</p>
                      <p className="text-[#0F80DD]">123 Innovation Drive, CA 94103</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-linear-to-br from-[#25D366]/20 to-transparent border border-[#25D366]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle size={150} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">Join the WhatsApp Group</h3>
                  <p className="text-white/70 mb-6 relative z-10 max-w-sm">Get real-time updates, daily algo challenges, and instant support from the community.</p>
                  <a 
                    href="https://chat.whatsapp.com/your-invite-link" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#1EBE5A] transition-colors relative z-10"
                  >
                    <MessageCircle size={20} />
                    Join Community Now
                  </a>
                </div>

                {/* Socials */}
                <div className="mt-12">
                  <h4 className="text-white text-sm uppercase tracking-widest font-semibold mb-4">Follow our journey</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] transition-colors">
                      <FaTwitter size={18} className="text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#0A66C2] transition-colors">
                      <FaLinkedin size={18} className="text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <FaGithub size={18} className="text-white" />
                    </a>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Contact Form */}
            <div>
              <FadeInWhenVisible delay={0.3}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
                  <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
                  
                  {isSubmitted ? (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="text-green-400" size={28} />
                      </div>
                      <h4 className="text-xl text-white font-semibold mb-2">Message Sent!</h4>
                      <p className="text-green-200/70">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2 pl-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7928FF] transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2 pl-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7928FF] transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2 pl-1">How can we help?</label>
                        <textarea 
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7928FF] transition-colors resize-none"
                          placeholder="Please describe your inquiry..."
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-linear-to-r from-[#7928FF] to-[#4C00FF] text-white font-semibold shadow-[0_0_20px_rgba(120,40,255,0.3)] hover:shadow-[0_0_30px_rgba(120,40,255,0.5)] transition-all hover:-translate-y-0.5"
                      >
                        <Send size={18} />
                        Send Message
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
