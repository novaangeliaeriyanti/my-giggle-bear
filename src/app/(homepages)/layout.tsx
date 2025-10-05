import Footer from "@/components/layouts/footer/Footer"
import FooterV2 from "@/components/layouts/footer/FooterV2"
import Navbar from "@/components/layouts/navbar"
import type { ReactNode } from "react"

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
