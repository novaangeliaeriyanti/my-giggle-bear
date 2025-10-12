"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import Register from "@/components/sections/register/Register";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <Register />
      </div>
      <Footer />
    </div>
  );
}
