import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Search, ArrowRight, Palette, Server, Code, Brain, BarChart3, Binary } from "lucide-react";

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

const cohorts = [
  { title: "UI/UX & Product Design", icon: Palette },
  { title: "Backend Development", icon: Server },
  { title: "Frontend Development", icon: Code },
  { title: "Machine Learning", icon: Brain },
  { title: "Computational Analysis", icon: BarChart3 },
  { title: "Algorithm Basics", icon: Binary },
];

export default function CohortsSection() {
  return (
    <section className="relative z-20 px-4 sm:px-6 pt-12 pb-6 sm:pt-16 md:pt-24 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInWhenVisible delay={0.2}>
          <header className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="mx-auto mb-4 sm:mb-6 w-full max-w-134.5 text-center font-semibold font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl md:text-[72.8527px] md:leading-23 md:tracking-[-4.40297px] bg-[linear-gradient(270deg,#6635C4_0%,#050020_147.96%)] bg-clip-text text-transparent">
              Learning Cohorts
            </h1>
            <p className="text-white/90 text-xs sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Phasellus accumsan imperdiet tempor. <br />
              Cras tincidunt, arcu nec eleifend porttitor, orci est vehicula
            </p>
          </header>
        </FadeInWhenVisible>

        {/* Search Bar */}
        <FadeInWhenVisible delay={0.3}>
          <div className="w-full flex justify-center">
            <div className="flex w-full max-w-127
          h-13 sm:h-15
          gap-2.5
          ">
              <div
              className="
          flex flex-row items-center
          w-full
          py-2.5 sm:py-2.5
          pr-2.5 sm:pr-2.5
          pl-4 sm:pl-6.75
          rounded-[15px]
          bg-linear-to-r from-[#060221] from-[-14.09%] to-[#201239] to-100%
          shadow-[inset_0_0_17.2px_#023053]
        "
            >
              <input
                type="text"
                placeholder="Search for a course"
                className="
            flex-1
            bg-transparent
            text-sm sm:text-base
            text-white
            placeholder-white/40
            focus:outline-none
            pr-4
          "
              />

              
            </div>
            {/* Search Icon Bubble */}
              <div
                className="
            h-full w-15 
            rounded-[15px]
            flex items-center justify-center
          
          bg-[linear-gradient(90deg,#060221_-14.09%,#201239_100%)]
          shadow-[inset_0_0_17.2px_#023053]
          "
              >
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
            
          </div>
        </FadeInWhenVisible>

        {/* Swiper */}
        <FadeInWhenVisible delay={0.4}>
          <div className="relative w-full flex justify-center items-center min-h-80 sm:min-h-125">
            {/* Center fixed person */}
            <div className="absolute z-20 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 sm:px-0">
              <div className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[#7B37D9] shadow-[0_0_56px_#9326D1] sm:h-[245px] sm:w-[245px] md:h-72.75 md:w-72.75 md:shadow-[0_0_94px_#9326D1]">
                <div className="relative flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_0_32px_rgba(0,19,34,0.08)] sm:h-[205px] sm:w-[205px] md:h-61.25 md:w-61.25 md:shadow-[0_0_51.2px_rgba(0,19,34,0.08)]">
                  <img
                    src="/favicon.png"
                    alt="center-person"
                    className="h-[70px] w-[92px] object-contain sm:h-[92px] sm:w-[120px] md:h-[115.76px] md:w-[151.94px]"
                  />
                </div>
              </div>

              <button
                className="mt-5 flex h-[54px] w-[176px] items-center justify-center gap-2.5 rounded-[16px] bg-linear-to-r from-[#951DC8] from-0% to-[#1C044E] to-100% px-3.5 font-['Plus_Jakarta_Sans'] text-[16px] font-normal leading-6 tracking-[-0.4px] text-white shadow-[inset_0_0_25.025px_rgba(0,121,221,0.7)] transition-transform hover:scale-[1.03] sm:mt-8.5 sm:h-19.25 sm:w-[220.73px] sm:gap-[12.83px] sm:rounded-[19.25px] sm:px-[12.83px] sm:text-[25.6714px] sm:leading-8 sm:tracking-[-0.641785px]"
              >
                Enroll now
                <ArrowRight className="h-4 w-4 -rotate-45 stroke-[2.08807px] sm:h-[16.33px] sm:w-[16.33px]" />
              </button>
            </div>

            {/* Background moving slides */}
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={40}
              slidesPerView={1.5}
              centeredSlides={true}
              loop={true}
              loopAdditionalSlides={3}
              freeMode={{ enabled: true, momentum: false }}
              speed={8000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={false}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 50 },
                640: { slidesPerView: 3, spaceBetween: 60 },
                1024: { slidesPerView: 5, spaceBetween: 80 },
              }}
              className="cohorts-swiper w-full pointer-events-none"
            >
              {[...cohorts, ...cohorts, ...cohorts].map((item, index) => {
                const Icon = item.icon;
                return (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center opacity-50">
                      <div className="w-16 h-16 sm:w-17 sm:h-17 md:w-18 md:h-18 lg:w-19 lg:h-19 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center mb-2 sm:mb-3">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white/70" />
                      </div>
                      <p className="text-center text-[10px] sm:text-xs md:text-sm text-white/60 max-w-20 sm:max-w-25 md:max-w-30 leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
