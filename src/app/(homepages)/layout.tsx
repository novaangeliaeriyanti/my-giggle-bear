import Footer from "@/components/layouts/Footer"
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
