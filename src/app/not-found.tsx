"use client";

import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import StatusMessage from "@/components/ui/StatusMessage";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/home1");
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <StatusMessage
        title="404. Page not found"
        description="Sorry, we couldn‘t find the page you where looking for. We suggest that you return to homepage."
        imageSrc="/images/icons/not-found.png"
        buttonText="Back to homepage"
        buttonIcon={<Home className="w-4 h-4" />}
        buttonAction={handleBackHome}
      />
      <Footer />
    </div>
  );
}
