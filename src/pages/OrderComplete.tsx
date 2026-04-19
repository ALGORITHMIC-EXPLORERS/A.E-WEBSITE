import Navbar from "../components/ui/OrderComplete/NavBar";
import Footer from "../components/ui/OrderComplete/Footer";
import OrderSuccess from "../components/ui/OrderComplete/OrderSuccess";

export default function OrderCompletePage() {

  return (
    <div className="min-h-screen bg-[#050020] text-white flex flex-col relative">

      {/* GLOBAL BACKGROUND (GLOW LAYER) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-[718px] h-[718px] bg-purple-700/30 blur-[250px] top-[-250px] left-[-400px]" />
        <div className="absolute w-[718px] h-[718px] bg-purple-600/40 blur-[220px] top-[245px] right-[-800px]" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ORDER COMPLETE SECTION */}
      <OrderSuccess />

      {/* FOOTER */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}