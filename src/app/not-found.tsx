"use client"

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    const handleBackHome = () => {
      router.push("/home1")
    }
  return (
    <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
            <div className="flex-1 flex flex-col gap-4 justify-center items-center mx-auto p-4">
                <Image
                    src="/images/icons/not-found.png" 
                    alt="Page not found"
                    width={300}
                    height={300}
                    className="object-contain max-w-[80%] md:max-w-[400px] animate-float"
                    priority
                />
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                    <h2 className="text-secondary">404. Page not found</h2>
                    <span className="text-body">Sorry, we couldn‘t find the page you where looking for. We suggest that you return to homepage.</span>
                </div>
                <Button
                    onClick={handleBackHome}
                    icon={<Home className="w-4 h-4" />}
                    desc="Back to homepage"
                />    
            </div>
        <Footer />
    </div>
  );
}
