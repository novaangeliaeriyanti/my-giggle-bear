import Carousel from "@/components/sections/carousel/Carousel"
import EventProducts from "@/components/sections/EventProducts"
import ProductsListSection from "@/components/sections/products-list/ProductList"
import ServiceHighlights from "@/components/sections/service-highlight/ServiceHighlights"
import Testimonials from "@/components/sections/Testimonials"
import VideoSection from "@/components/sections/video/VideoSection"
import VoucherBanner from "@/components/sections/VoucherBanner"

export default function Home1() {
  return (
    <main className="max-w-screen overflow-hidden">
      <Carousel />
      <ServiceHighlights />
      <EventProducts />
      <VoucherBanner />
      <ProductsListSection category="" />
      <VideoSection />
      <Testimonials />
    </main>
  )
}
