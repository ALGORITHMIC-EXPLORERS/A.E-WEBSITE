import { useState } from "react";

import Navbar from "../components/ui/ShoppingCart/Navbar";
import CartItem from "../components/ui/ShoppingCart/CartItem";
import OrderSummary from "../components/ui/ShoppingCart/OrderSummary";
import Footer from "../components/ui/ShoppingCart/Footer";

export default function ShoppingCartPage() {
  const [activeBreadcrumb, setActiveBreadcrumb] = useState("course");

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

      {/* CONTENT */}
      <main className="relative z-10 flex-1 max-w-[1750px] mx-auto w-full px-6 mt-10">

        <div className="flex items-start gap-14">

          <div className="w-full max-w-[1050px]">

            <div className="flex items-center mb-6 text-sm">
              <button
                onClick={() => setActiveBreadcrumb("home")}
                className={`cursor-pointer transition ${
                  activeBreadcrumb === "home"
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Home
              </button>

              <span className="text-gray-500 mx-3">›</span>

              <button
                onClick={() => setActiveBreadcrumb("categories")}
                className={`cursor-pointer transition ${
                  activeBreadcrumb === "categories"
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Categories
              </button>

              <span className="text-gray-500 mx-3">›</span>

              <button
                onClick={() => setActiveBreadcrumb("course")}
                className={`cursor-pointer transition ${
                  activeBreadcrumb === "course"
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Introduction to User Experience Design
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              1 Course in cart
            </p>

            <div className="space-y-6">
              <CartItem />
              <CartItem />
              <CartItem />
            </div>

          </div>

          <OrderSummary />

        </div>

      </main>

      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}