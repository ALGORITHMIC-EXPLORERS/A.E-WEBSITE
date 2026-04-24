import Navbar from "../components/ui/Profile/Navbar";
import Sidebar from "../components/ui/Profile/Sidebar";
import ProfileForm from "../components/ui/Profile/ProfileForm";
import ImageUpload from "../components/ui/Profile/ImageUpload";
import LinksForm from "../components/ui/Profile/LinksForm";
import Footer from "../components/ui/Profile/Footer";

export default function Profile() {
  return (
    <div className="bg-[#050020] text-white min-h-screen relative overflow-hidden">
     
           {/* 🌌 GLOBAL BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* TOP CENTER GLOW */}
        <div className="absolute w-[1000px] h-[1000px] bg-purple-700/20 blur-[250px] top-[-400px] right-[1200px] " />

        {/* LEFT FAINT GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 blur-[200px] top-[35%] left-[-150px]" />

        {/* MAIN RIGHT GLOW */}
        <div className="absolute w-[900px] h-[900px] bg-purple-600/30 blur-[220px] top-[45%] right-[-200px]" />

        {/* BOTTOM RIGHT INTENSE GLOW */}
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/30 blur-[200px] bottom-[-150px] right-[5%]" />

      </div>

     
      <Navbar />

      <section>
        <div className="flex gap-6 px-8 pt-24">
        <Sidebar />

        <div className="flex-1 space-y-6 max-w-5xl">
          <ProfileForm />
          <ImageUpload />
          <LinksForm />
        </div>
        
      </div>
      </section>
      
      <Footer />
    </div>
  );
}
