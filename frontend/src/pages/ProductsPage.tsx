import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ShoppingBag } from "lucide-react";

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

const placeholderProducts = [
  {
    id: 1,
    name: "AE Developer Toolkit",
    description: "A comprehensive suite of CLI tools and custom VS Code extensions to supercharge your algorithmic coding workflow.",
    link: "#",
    badge: "Most Popular",
    thumbnail: "https://images.unsplash.com/photo-1550439062-8e1088d89e47?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "System Design Blueprint Pro",
    description: "The ultimate 50-page digital guide covering architecture patterns, database scaling, and microservices.",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1627398225081-24c8928c0bba?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "AE Hoodie & Merch Bundle",
    description: "Rep the Algorithmic Explorers community with our high-quality, ultra-comfortable dark mode merch.",
    link: "#",
    badge: "Limited Edition",
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ProductsPage() {
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
                AE Store
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Premium tools, resources, and merch crafted specifically for the AE community.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderProducts.map((product, idx) => (
              <FadeInWhenVisible delay={0.1 * idx} key={product.id}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group flex flex-col h-full shadow-xl hover:shadow-[0_8px_30px_rgba(120,40,255,0.15)] hover:-translate-y-2">
                  
                  {/* Thumbnail area */}
                  <div className="relative h-56 w-full overflow-hidden bg-white/5">
                    <img 
                      src={product.thumbnail} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-linear-to-r from-[#7928FF] to-[#0F80DD] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag size={18} className="text-[#0F80DD]" />
                      <h2 className="text-xl font-semibold text-white">
                        {product.name}
                      </h2>
                    </div>
                    
                    <p className="text-white/60 text-base leading-relaxed mb-8 flex-grow">
                      {product.description}
                    </p>

                    {/* CTA Button */}
                    <a 
                      href={product.link}
                      className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    >
                      <ExternalLink size={18} />
                      Get it Now
                    </a>
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
