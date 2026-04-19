import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

/**
 * Notes:
 * - The uploaded profile image is used from the local path:
 *   /mnt/data/testimonials-person.png
 *
 * - Drop this file into your React + Tailwind project. Make sure you have:
 *   npm install framer-motion swiper lucide-react
 *
 * - Tailwind utilities are used to reproduce the look: gradient background,
 *   blurred card, purple glow, left portrait, right testimonial text, quote mark,
 *   and circular arrow at bottom-right.
 */

/* Small reusable FadeInWhenVisible used for entrance animation */
const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

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

type Testimonial = {
  id: string;
  text: string;
  name: string;
  title?: string;
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    text: "Using this tool has completely transformed how our team operates. We're more organized, meet our deadlines consistently, and collaboration has never been smoother. It's a game-changer!",
    name: "Ketul Adani",
    title: "CEO of xyz company",
    image: "testimonials-person.png",
  },
  {
    id: "t2",
    text: "This product removed so much friction from our workflow. The UI is delightful and the reliability is outstanding — highly recommended.",
    name: "Aisha K.",
    title: "Head of Ops",
    image: "testimonials-person.png",
  },
  {
    id: "t3",
    text: "We gained clarity and velocity after adopting this. The team morale improved and deliveries became predictable.",
    name: "Daniel R.",
    title: "Product Lead",
    image: "testimonials-person.png",
  },
];

export default function TestimonialSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Testimonials"
      className="relative w-full py-4 sm:py-5 md:py-8 px-4 sm:px-6 overflow-visible"
    >
      {/* decorative blue radial glow in center (enhances the blob) */}
      <div className="pointer-events-none absolute -left-65.5 top-[18%] z-0 h-122.25 w-120.75 -translate-y-1/2 rounded-full bg-[#5F00FF] mix-blend-normal blur-[250px]" />
      <div className="pointer-events-none absolute -right-65.5 top-[18%] z-0 h-122.25 w-120.75 -translate-y-1/2 rounded-full bg-[#5F00FF] mix-blend-normal blur-[250px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInWhenVisible delay={0.05}>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="mx-auto w-full pt- max-w-210.25 font-['Plus_Jakarta_Sans'] text-xl font-semibold leading-none tracking-[-0.06em] text-center bg-[linear-gradient(270deg,#9623CF_0%,#070121_147.96%)] bg-clip-text text-transparent sm:text-3xl md:text-[40.3857px] md:leading-12.75 md:tracking-[-2.44078px]">
              World Algorithmic Explorers Learning Streak Rank
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.12}>
          <div className="relative w-full ">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              slidesPerView={1}
              spaceBetween={24}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="testimonial-swiper"
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="relative w-full">
                    <article
                      className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] items-stretch gap-5 md:gap-20 rounded-4xl bg-white/6 backdrop-blur-lg min-h-80 sm:min-h-136 md:min-h-136 p-4 sm:p-8 md:p-10 w-full mx-auto"
                    >
                      {/* Left image column */}
                      <div className="relative w-full lg:w-83 h-full shrink-0 self-stretch">
                        <div className="relative rounded-3xl overflow-hidden">
                          {/* Purple gradient overlay on image */}
                          <div className="absolute inset-0 bg-linear-to-br from-purple-600/60 via-purple-500/40 to-transparent z-10 mix-blend-multiply" />
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full object-cover block"
                          />
                        </div>
                      </div>

                      {/* Right text column */}
                      <div className="relative w-full h-full self-stretch grid min-h-full grid-rows-[auto_1fr_auto] text-start text-white">
                        {/* Large quote mark */}
                        <div className="mb-4">
                          <img src="/quotes.png" alt="" className="w-8.5 h-8.5 rotate-180"/>
                        </div>

                        {/* paragraph text */}
                        <div className="flex w-full flex-col justify-center space-y-3 md:space-y-5 lg:max-w-2xl">
                          <p className="text-xl lg:text-2xl font-normal leading-loose text-[#FFFFFFBF]">
                            {t.text}
                          </p>
                        </div>

                        {/* bottom row: name/title and circular arrow */}
                        <div className="w-full lg:max-w-3xl pt-4 md:pt-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="font-semibold text-white text-xl sm:text-2xl lg:text-3xl">
                                {t.name}
                              </div>
                              <div className="text-[10px] font-medium sm:text-base md:text-lg text-white/60">
                                {t.title}
                              </div>
                            </div>

                            {/* circular arrow */}
                            <button
                              onClick={() => swiperInstance?.slideNext()}
                              aria-label="Next testimonial"
                              className="relative w-9 h-9 md:w-auto md:h-15 rounded-full flex items-center justify-center
                                         transition-all duration-300 group/btn shrink-0
                                         hover:scale-110 cursor-pointer"
                            >
                              <img src="/next-arrow.png" alt='arrow' className="h-5 md:h-7 lg:h-13 text-white transition-transform group-hover/btn:translate-x-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pagination dots indicator - minimal style */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperInstance?.slideToLoop(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 h-1.5 bg-white/60"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
