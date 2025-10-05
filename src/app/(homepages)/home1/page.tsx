import Carousel from "@/components/sections/carousel/Carousel"
import EventProducts from "@/components/sections/EventProducts"
import ServiceHighlights from "@/components/sections/service-highlight/ServiceHighlights"
import VideoSection from "@/components/sections/video/VideoSection"
import VoucherBanner from "@/components/sections/VoucherBanner"
import { homepageVariants } from "@/data/homepage"

export default function Home1() {
  const config = homepageVariants.home1

  return (
    <main>
      <Carousel />
      <ServiceHighlights />
      <EventProducts />
      <VoucherBanner />
      <VideoSection />
    </main>
  )
}
