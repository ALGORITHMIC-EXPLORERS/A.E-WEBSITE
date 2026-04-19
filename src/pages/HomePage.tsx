// src/pages/HomePage.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import WhoWeAreSection from "../components/ui/WhoWeAre";
import { Mouse } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import CohortsSection from "../components/ui/CohortsSection";
import TestimonialSwiper from "../components/ui/TestimonialSwiper";
import CommunitySection from "../components/ui/CommunitySection";

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

const Card = ({
  title,
  subtitle,
  cta,
  center = false,
  first = false,
  last = false,
  comment,
  commentLink,
}: {
  title: string;
  subtitle?: string;
  cta?: string;
  comment?: string;
  commentLink?: string;
  center?: boolean;
  first?: boolean;
  last?: boolean;
}) => (
  <div
    className="
      w-full min-h-80 md:h-82
      bg-white/4 backdrop-blur-md border border-white/20
      rounded-xl p-6 sm:p-8 md:p-10
      relative
      flex flex-col justify-between items-start
      shadow-xl
    "
  >
    <div className="w-full sm:w-[95%] ">

      {first && (
        <img
          src="/badge 1.png"
          alt={title}
          className="mb-5 rounded-full bg-black h-10 lg:h-12.5"
        />
      )}
      {center && (
        <img
          src="/badge 2.png"
          alt={title}
          className="mb-5 rounded-full bg-white h-10 lg:h-12.5"
        />
      )}
      {last && (
        <img
          src="/badge 3.png"
          alt={title}
          className="mb-5 rounded-full bg-black h-10 lg:h-12.5"
        />
      )}

      <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 text-start">{title}</h3>
      {subtitle && first && (
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed text-start">{subtitle}</p>
      )}
      {subtitle && center && (
        <p className="text-white/60 text-base sm:text-lg bottom-25 absolute leading-relaxed">
          {subtitle}
        </p>
      )}
      {subtitle && !first && !center && (
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed text-start">{subtitle}</p>
      )}
    </div>

    {(cta || (comment && commentLink)) && (
      <div className="mt-6 w-full">
        {cta && (
          <button
            className={
              center
                ? "w-full py-2 rounded-md flex items-center justify-center bg-linear-to-r from-[#7928FF]  to-[#4C00FF] text-white font-semibold shadow-lg"
                : undefined
            }
          >
            {cta}
          </button>
        )}
        {comment && commentLink && (
          <p className="text-white/60 text-start text-sm leading-relaxed">
            <a href="" className="text-[#0F80DD] text-md mr-2">
              {commentLink}
            </a>
            {comment}
          </p>
        )}
      </div>
    )}
  </div>
);

const HomePage = () => {
  const sponsors = [
    { name: "Company 1", logo: "/unsplash-logo.png" },
    { name: "Company 2", logo: "/Notion-logo.png" },
    { name: "Company 3", logo: "/Intercom-logo.png" },
    { name: "Company 4", logo: "/descript-logo.png" },
    { name: "Company 5", logo: "/Grammarly-logo.png" },
    { name: "Company 6", logo: "/Intercom-logo.png" },
  ];

  return (
    <>
    <div className="relative overflow-hidden bg-[#050020]">
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url('${bgPath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Enhanced overlay for better blending */}
    
      {/* Additional soft overlay for depth */}
      <div className="absolute inset-0 bg-[#050020]/40 pointer-events-none" />

      {/* centered hero */}
      <header className="relative z-20 flex items-center justify-center min-h-screen pt-80 lg:pt-70 lg:pb-12 h-screen">
        <div className="max-w-3xl text-center px-4 sm:px-6">
          <FadeInWhenVisible>
            <p className="text-white/90 tracking-widest text-xs sm:text-sm md:text-base mb-3 md:mb-4">
              Welcome to AE.
            </p>

            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow-[0_8px_40px_rgba(120,40,255,0.25)]">
              Gear Up For The
              <br />
              Future.
            </h1>

            <p className="text-white/90 mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur <span className="block">adipiscin</span>
            </p>

            {/* circular indicator + down arrow */}
            <div className="flex flex-col items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/70">
                <Mouse size={25} strokeWidth={1.5} />
              </div>
              <ArrowDown size={38} className="text-white/80 animate-bounce" />
            </div>
          </FadeInWhenVisible>
        </div>
      </header>

      {/* cards row */}
      <section className="relative z-20 -mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* changed from flex to grid for equal widths */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <FadeInWhenVisible delay={0.1}>
              <Card
                title="Do it the Algorithmic Explorers Way"
                subtitle="Phasellus accumsan imperdiet tempor."
                commentLink="AE retreat on"
                comment="31st December, 2025"
                first
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.25}>
              <Card
                title="Prioritizing Growth"
                subtitle="With 120k+ active user's"
                cta="Sign Up as Volunteer"
                center
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.4}>
              <Card
                title="Collaboration & Development"
                subtitle="Phasellus accumsan imperdiet tempor."

                commentLink="AE retreat on"
                comment="31st December, 2025"
                last
              />
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

</div>

      {/* Trust Section */}
      <FadeInWhenVisible delay={0.3} y={20}>
        <section className="relative z-20 pb-3 sm:pb-4 px-4 sm:px-6">
          {" "}
          {/* removed top padding, minimal bottom */}
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-lg sm:text-4xl md:text-5xl text-white font-semibold">
              Trusted by 25,000+ Teams Worldwide
            </h1>
          </div>
        </section>
      </FadeInWhenVisible>
      {/* Sponsors Section – Swiper marquee with blurred fade edges */}
      <FadeInWhenVisible delay={0.5} y={20}>
        <section className="relative z-20 pt-0 pb-6 sm:pb-8 px-4 sm:px-6">
          {/* removed top padding */}
          <div className="max-w-7xl mx-auto w-full overflow-hidden rounded-xl shadow-[inset_0_25px_80px_rgba(0,0,0,0.55)]">
            <div className="relative">
              <Swiper
                className="marquee-swiper pointer-events-none"
                modules={[Autoplay, FreeMode]}
                slidesPerView={2.5}
                spaceBetween={24}
                loop
                loopAdditionalSlides={sponsors.length}
                freeMode={{ enabled: true }}
                allowTouchMove={false}
                speed={8000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 3.5 },
                  768: { slidesPerView: 4.5 },
                  1024: { slidesPerView: 5.5 },
                }}
              >
                {[...sponsors, ...sponsors].map((s, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex items-center justify-center h-22 rounded-xl p-6">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="max-h-16 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Blurred linear edges */}
              <div className="marquee-edge-left" />
              <div className="marquee-edge-right" />
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
      
              
      <WhoWeAreSection />
        
      {/* GURU CIRCLE */}
      
      <FadeInWhenVisible delay={0.2} y={30}>
        <section className="relative z-20 min-h-80 overflow-visible px-4 py-12 sm:px-6 sm:py-16 md:py-10">
          {/* decorative purple radial glow in center (enhances the blob) */}
          <div
            className="pointer-events-none absolute -bottom-30 left-15 z-0 h-131.25 w-131.25 rounded-full bg-[rgba(244,160,255,0.15)] blur-[125px]"
          />

          <div
            className="pointer-events-none absolute -top-55 -right-28 z-0 h-131.25 w-131.25 rounded-full bg-[rgba(244,160,255,0.15)] blur-[125px]"
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-6xl text-start text-white font-semibold sm:text-3xl mb-6 sm:mb-8 md:mb-10">
              The Guru Circle
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:flex-row gap-6 md:gap-0 py-2">
              <div className="w-full md:w-149 h-full  md:h-144 p-4 sm:p-6 transition-all duration-700 hover:scale-105 rounded-3xl bg-white/10">
                <img
                  src="/guru-preview.png"
                  className="rounded-2xl h-full w-full object-cover shadow-lg border-3 border-white/10"
                  alt="Guru Circle Preview"
                />
              </div>
              <div className="w-full p-3 sm:p-5 h-full flex flex-col justify-center">
                <div className="py-6 sm:py-8 md:py-10 text-white/75 text-base font-normal leading-relaxed lg:text-2xl text-justify">
                  <p className="mb-4 sm:mb-5">
                    An exclusive forum section where members who have advanced
                    in their AI journey (Gurus) can share their knowledge,
                    showcase projects, collaborate on challenges, and discuss
                    advanced AI topics.
                  </p>
                  <p>
                    Gain access to general discussions, project showcases, job
                    opportunities, mentorship requests.
                  </p>
                </div>
                <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-5 w-full">
                  <button className="flex flex-row justify-center items-center w-[172px] h-[60px] p-[10px] gap [10px] rounded-[15px] 
                  bg-[linear-gradient(270deg,#A822DB_0%,#09003B_100%)] shadow-[inset_0_0_19.5px_rgba(0,121,221,0.7)] text-white 
                  text-base lg:text-xl font-normal transition-all duration-500 hover:-translate-y-1">
                    <ArrowUpRight size={15} className="sm:w-4 sm:h-4" />
                    Read More
                  </button>

                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
      <CohortsSection />
      <TestimonialSwiper />
      {/* Community Section */}
      <CommunitySection />
      </div>
    </>
  );
};

export default HomePage;
