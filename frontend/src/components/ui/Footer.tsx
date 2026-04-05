

function Footer() {
  return (
     <div className="mt-20 border-t border-white/10 pt-10 px-6 md:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm items-start">
            {/* Brand / Description */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-white text-2xl md:text-3xl mb-2">
                Algorithmic Explorers.
              </h4>
              <p className="my-4 md:my-6 text-base md:text-[16px]">
                Work together seamlessly with real-time updates and
                communication.
              </p>
              <p className="font-semibold text-white/75 text-sm md:text-[18px]">
                Team Conditional & Policy
              </p>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-bold text-lg md:text-[20px] mb-4 md:mb-5">
                Pages
              </h4>
              <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Home
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Projects
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  AE News
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Eco Team
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg md:text-[20px] mb-4 md:mb-5">
                Company
              </h4>
              <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
                <li className="text-white hover:text-white cursor-pointer">
                  Customer
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Enterprise
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Partners
                </li>
                <li className="text-white/75 hover:text-white cursor-pointer">
                  Job
                </li>
              </ul>
            </div>

            {/* Button */}
            <div className="flex md:justify-end mt-4 md:mt-0">
              <button className="bg-[#5F00FF] px-6 py-2 md:px-7 md:py-3 rounded-full text-xs md:text-sm hover:bg-[#7a33ff] transition">
                Log Out
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-gray-500 text-xs mt-10">
            © ae. all rights reserved
          </div>
        </div>
  )
}

export default Footer
