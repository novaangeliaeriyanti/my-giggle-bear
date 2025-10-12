"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import Search from "@/components/sections/search/Search";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div></div>}>
          <Search />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
