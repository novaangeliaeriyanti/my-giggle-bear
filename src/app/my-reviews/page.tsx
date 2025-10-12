"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import MyReviews from "@/components/sections/my-reviews/MyReviews";

export default function MyReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <MyReviews />
      </div>
      <Footer />
    </div>
  );
}
