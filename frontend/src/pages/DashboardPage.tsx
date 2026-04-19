import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="pt-24 px-6 min-h-screen bg-[#050020] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Welcome back, {user?.firstName || "Student"}!
        </h1>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <p className="text-xl text-gray-300 leading-relaxed">
            Your learning journey continues here. Explore your modules, track your progress, and climb the leaderboard.
          </p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Role</h3>
              <p className="text-lg font-semibold">{user?.role || "STUDENT"}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Username</h3>
              <p className="text-lg font-semibold">{user?.username}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Email</h3>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
