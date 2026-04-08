import pic1 from "../learning-cohorts/images/image (copy 1).png"
import pic2 from "../learning-cohorts/images/image (1).png"
import arrow from "../learning-cohorts/images/arrow-narrow-right.png"
export default function CTAFooter() {
  return (
    <section className="w-full py-32">

      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* ================= TOP CTA ================= */}
        <div className="grid md:grid-cols-2 items-center">

          {/* IMAGE (closer to edge) */}
          <div className="flex justify-start">
            <div className="w-[400px] h-[425px] rounded-[40px] overflow-hidden">
              <img
                src= {pic1}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* TEXT (tight beside image) */}
          <div className="max-w-md ml-0">
            <h3 className="text-xl font-semibold mb-3 text-left">
              Become an Instructor
            </h3>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed text-left">
              Instructors from around the world teach millions of students on Byway.
              We provide the tools and skills to teach what you love.
            </p>

            <div className="flex justify-start">
              <button className="px-5 py-2 rounded-lg bg-[#5F00FF] text-sm font-medium hover:opacity-90 transition">
                Start Your Instructor Journey <img src= {arrow}/>
              </button>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="grid md:grid-cols-2 items-center">

          {/* TEXT */}
          <div className="max-w-md mr-6 ml-50 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-3 text-left">
              Transform your life through education
            </h3>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed text-left">
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </p>

            <div className="flex justify-start">
              <button className="px-6 py-2 rounded-lg bg-[#5F00FF] text-sm font-medium hover:opacity-90 transition">
                Checkout Courses <img src= {arrow}/>
              </button>
            </div>
          </div>

          {/* IMAGE (closer to right edge) */}
          <div className="flex justify-end order-1 md:order-2">
            <div className="w-[471.5px] h-[385px] rounded-[40px] overflow-hidden">
              <img
                src= {pic2}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <footer className="pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-left">
                Algorithmic Explorers.
              </h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed text-left">
                Work together seamlessly with real-time updates and communication.
              </p>
              <p className="text-gray-500 text-sm text-left">
                Team Conditional & Policy
              </p>
            </div>

            {/* PAGES */}
            <div>
              <h3 className="font-medium mb-4 ml-40 text-left">Pages</h3>
              <ul className="space-y-2 text-sm text-gray-400 ml-40 text-left">
                <li>Home</li>
                <li>Projects</li>
                <li>AE News</li>
                <li>Exco Team</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="font-medium mb-4 text-left ml-50">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400 ml-50 text-left">
                <li>Customer</li>
                <li>Enterprise</li>
                <li>Partners</li>
                <li>Job</li>
              </ul>
            </div>

            {/* BUTTON */}
            <div className="flex md:justify-end items-start">
              <button className="px-6 py-2 rounded-full bg-[#5F00FF] text-sm font-medium">
                Log Out
              </button>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
            @ae. all right reserve
          </div>
        </footer>

      </div>
    </section>
  );
}