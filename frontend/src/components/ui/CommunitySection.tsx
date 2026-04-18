import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// TODO: Replace with your real WhatsApp / Discord / Telegram invite link
const COMMUNITY_LINK = "https://forms.gle/sc9w11jVmH6tucEo8";

const VECTOR = "Vector.png";
const GHANA = "ghana 1.png";

export default function CommunitySection(){
  return (
    <section className="relative h-fit p-5 bg-[#070014] text-white overflow-hidden flex flex-col items-center">
      {/* Title Section */}
      <div className="mt-20 text-center">
        <h1 className="text-7xl lg:text-[87.11px] font-semibold tracking-tight">Our Community</h1>
        <div className="flex justify-center mt-4">
          <div className="relative flex h-10 lg:h-12 w-56.25 items-center justify-center rounded-[9.90566px] bg-[linear-gradient(90deg,#001F38_-14.09%,rgba(0,86,157,0.32)_100%)] px-[33.4057px] text-white shadow-[0_0_20px_rgba(123,75,255,0.18)]">
            <div className="relative flex h-12 min-w-[188.21px] items-center justify-start">
             <img src="/btn-members.png" alt="" className="h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Country Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {['Ghana', 'Nigeria', 'Tokyo', 'Morocco', ].map((c, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative flex h-10 lg:h-12 items-center justify-center rounded-[9.90566px] bg-[linear-gradient(90deg,#001F38_-14.09%,rgba(0,86,157,0.40)_100%)] px-8 lg:px-10 text-white shadow-[0_0_20px_rgba(123,75,255,0.18)] font-normal text-lg lg:text-2xl"
          >
            <img src={GHANA} alt='ghana' className="inline-block w-4 h-4 mr-2 align-middle" /> 
            {c}
          </motion.button>
        ))}
        <div className="font-semibold text-base lg:text-xl flex items-center justify-center">
          See More
          <ArrowRight size={16} className="inline-block ml-2 align-middle mt-1" />
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="w-full max-w-7xl mt-15 lg:mt-20 flex flex-col items-center">
        <div className="w-full rounded-2xl overflow-hidden">
          {/* Map Background */}
          <img src={VECTOR} alt="map" className="w-full opacity-80 object-cover" />
        </div>

        {/* Search Bar */}
        <div className="mt-6 w-full max-w-161.75 px-4">
          <div className="flex flex-col items-stretch gap-3 p-0 sm:h-15 sm:flex-row sm:items-center sm:gap-2.75">
            <div className="flex h-14 w-full items-center gap-3 rounded-[15px] bg-[linear-gradient(90deg,#050020_-14.09%,#5F00FF_100%)] px-4 py-2.5 shadow-[inset_0_0_17.2px_#023053] sm:h-15 sm:w-105.25 sm:gap-3.25 sm:px-6.75">
              <input
                placeholder="Select your country"
                className="h-6.25 w-full min-w-0 bg-transparent text-base leading-6.25 tracking-[-0.500092px] text-[#407199] outline-none placeholder:text-[#407199] sm:w-43.75 sm:text-[20.0037px]"
              />
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path d="M1 1L6 5L11 1" stroke="#407199" strokeWidth="2" />
              </svg>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open(COMMUNITY_LINK, "_blank", "noreferrer")}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[15px] bg-[linear-gradient(270deg,#7422FF_0%,#050020_100%)] px-2.5 py-2.5 text-white shadow-[inset_0_0_19.5px_rgba(0,121,221,0.7)] sm:h-15 sm:w-53.75"
            >
              <ArrowUpRight size={20} className="inline-block" />
              <span className="h-6.25 text-base leading-6.25 tracking-[-0.500092px] text-white sm:text-[20.0037px]">
                Join Community
              </span>
            </motion.button>
          </div>
        </div>
      </div>


      {/* Bottom CTA */}
      <div className="mt-16 lg:mt-25 text-center relative w-full">
        {/* decorative purple radial glow in center (enhances the blob) */}
        <div
            className="pointer-events-none absolute -top-55 -right-1/4 z-0 h-131.25 w-131.25 rounded-full bg-[rgba(244,160,255,0.15)] blur-[125px]"
          />
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">So, what are you waiting for?</h3>
        <p className="text-gray-300 mt-2 text-xl lg:text-2xl">Stay updated with the latest news, tips, and updates.</p>

        <div className="mt-6 w-full max-w-145 mx-auto">
          <div className="flex w-full flex-col gap-3 md:h- md:flex-row md:items-center md:gap-4">
            <div className=" w-full rounded-[13px] border border-white/15 bg-white/15 md:h-14 md:w-100">
              <input
                type="email"
                placeholder="Enter your email..."
                className="h-full w-full bg-transparent px-5 text-base font-['Inter'] font-normal leading-[122%] text-white outline-none placeholder:text-white/50 md:px-8 md:text-lg"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              className="md:h-14 w-full rounded-[13px] bg-[#5F00FF] text-center text-[20px] font-['Inter'] font-medium leading-[122%] tracking-normal text-white shadow-xl md:w-61.75"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
