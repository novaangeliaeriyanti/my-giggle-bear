"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import Login from "@/components/sections/login/Login";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <Login />
      </div>
      <Footer />
    </div>
  );
}
