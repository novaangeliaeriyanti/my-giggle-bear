import CarouselV2 from "@/components/sections/carousel/CarouselV2";
import EventProducts from "@/components/sections/event-products-v2/EventProducts";
import ProductsListSection from "@/components/sections/products-list-v2/ProductList";
import ServiceHighlightsV2 from "@/components/sections/service-highlight/ServiceHighlightsV2";
import TestimonialsV2 from "@/components/sections/testimonials/TestimonialsV2";
import VideoSectionV2 from "@/components/sections/video/VideoSectionV2";
import VoucherBannerV2 from "@/components/sections/voucher-banner/VoucherBannerV2";
import { eventProducts } from "@/data/homepage";
import { Suspense } from "react";

export default function Home2() {
  return (
    <main className="max-w-screen overflow-hidden">
      <CarouselV2 />
      <ServiceHighlightsV2 />
      <EventProducts title={eventProducts.title} description={eventProducts.description} />
      <VoucherBannerV2 />
      <Suspense fallback={<div></div>}>
        <ProductsListSection />
      </Suspense>
      <VideoSectionV2 />
      <TestimonialsV2 />
    </main>
  );
}
