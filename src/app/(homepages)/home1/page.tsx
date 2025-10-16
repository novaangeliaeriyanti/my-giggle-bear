import Carousel from "@/components/sections/carousel/Carousel";
import EventProducts from "@/components/sections/event-products/EventProducts";
import ProductsListSection from "@/components/sections/products-list/ProductList";
import ServiceHighlights from "@/components/sections/service-highlight/ServiceHighlights";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import VideoSection from "@/components/sections/video/VideoSection";
import VoucherBanner from "@/components/sections/voucher-banner/VoucherBanner";
import { eventProducts } from "@/data/homepage";
import { Suspense } from "react";

export default function Home1() {
  return (
    <main className="max-w-screen overflow-hidden">
      <Carousel />
      <ServiceHighlights />
      <EventProducts title={eventProducts.title} description={eventProducts.description} />
      <VoucherBanner />
      <Suspense fallback={<div></div>}>
        <ProductsListSection />
      </Suspense>
      <VideoSection />
      <Testimonials />
    </main>
  );
}
