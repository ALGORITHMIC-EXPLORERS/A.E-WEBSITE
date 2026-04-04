import React from "react";
import GuriCircle from "./GuruCircle";

const Guru = () => {
  return (
    <>
      <GuriCircle />

      <main className="min-h-screen bg-gradient-to-br from-[#050022] via-[#0a003d] to-[#14005c] text-white px-6 py-10">
        <div>
          {/* ================= TOP SECTION ================= */}
          <div className="grid md:grid-cols-3 gap-10 items-center">
            
            {/* LEFT IMAGE CARD */}
            <div className="md:col-span-1">
              <div className="bg-[#0c0035] border border-blue-500 p-3 rounded-xl w-full max-w-[300px]">
                <div className="bg-gray-300 h-[200px] rounded-md" />
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="md:col-span-2 text-[15px] text-gray-300 leading-relaxed space-y-3 text-justify">
              <p>
                Guru Circle is an exclusive forum section where members who have
                advanced in their AI journey (Gurus) can share their knowledge,
                showcase projects, collaborate on challenges, and discuss
                advanced AI topics.
              </p>

              <ul className="space-y-2">
                <li>
                  ○ <span className="text-white font-medium">General Discussions:</span>{" "}
                  For deep technical conversations on AI trends, research, and innovations.
                </li>

                <li>
                  ○ <span className="text-white font-medium">Project Showcase:</span>{" "}
                  A space to present advanced projects for feedback and collaboration.
                </li>

                <li>
                  ○ <span className="text-white font-medium">Job Opportunities:</span>{" "}
                  A job board where members can post or view career opportunities,
                  freelance gigs, and internships.
                </li>

                <li>
                  ○ <span className="text-white font-medium">Mentorship Requests:</span>{" "}
                  A thread where Gurus can offer mentorship or request mentoring for specific AI topics.
                </li>
              </ul>
            </div>
          </div>

          {/* ================= ELIGIBILITY CARD ================= */}
          <div className="mt-12 bg-[#0c0035] border border-white/10 rounded-xl p-6 grid md:grid-cols-3 items-center gap-6 shadow-lg">
            
            <div className="rounded-lg overflow-hidden md:col-span-1">
              <div className="rounded-md">
                <img
                  src="/actor.png"
                  alt="Eligibility visual"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2 text-[12px] text-gray-300 leading-relaxed space-y-3 text-justify">
              <div className="flex flex-col space-y-3">
                
                <div>
                  <h3 className="text-white text-sm font-semibold">
                    Eligibility Criteria
                  </h3>

                  <p className="text-[15px]">
                    Guru Circle is an exclusive community. To gain full access,
                    members must meet the following requirements:
                  </p>
                </div>

                <div className="flex items-center mt-[23px] gap-3 min-h-[12vh]">
                  
                  <div>
                    <p className="text-white font-medium text-[14px]">
                      Complete Learning Cohort
                    </p>
                    <p className="text-gray-400 text-[14px]">
                      Successfully finish the AI learning program and earn your certification
                    </p>
                  </div>

                  <div className="w-[2px] min-h-[inherit] bg-white" />

                  <div>
                    <p className="text-white font-medium text-[12px]">
                      Join Volunteer Project
                    </p>
                    <p className="text-gray-400 text-[14px]">
                      Participate in at least one community volunteer project
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold mb-3">
            Ready to Join the Community?
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Start your verification process and gain access to exclusive
            resources, advanced discussions, and career opportunities.
          </p>

          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 rounded-full text-sm hover:opacity-90">
            Begin Qualification Process
          </button>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
            
            <div>
              <h4 className="font-semibold mb-2">Algorithmic Explorers.</h4>
              <p className="text-gray-400 text-xs">
                Work together seamlessly with real-time updates and communication.
              </p>
              <p className="mt-3 text-gray-500 text-xs">
                Team Conditional & Policy
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Pages</h4>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>Home</li>
                <li>Projects</li>
                <li>AE News</li>
                <li>Eco Team</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>Customer</li>
                <li>Enterprise</li>
                <li>Partners</li>
                <li>Job</li>
              </ul>
            </div>

            <div className="flex md:justify-end items-start">
              <button className="bg-purple-600 px-5 py-1 rounded-full text-xs">
                Log Out
              </button>
            </div>
          </div>

          <div className="text-center text-gray-500 text-xs mt-10">
            © ae. all right reserve
          </div>
        </div>
      </main>
    </>
  );
};

export default Guru;