"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import ProductAllReview from "@/components/sections/products-detail/ProductAllReview";
import { Suspense } from "react";

export default function AddReviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div></div>}>
          <ProductAllReview />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
