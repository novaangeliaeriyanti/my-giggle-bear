import { HeroStyle } from "@/data/homepage";

interface HeroProps {
  banner: string;
  style: HeroStyle; // gunakan type yang sudah dibuat
}

  
  export default function Hero({ banner, style = "classic" }: HeroProps) {
    return (
      <section
        className={`relative h-[400px] flex items-center justify-center text-white ${
          style === "classic" ? "bg-pink-200" :
          style === "modern" ? "bg-gradient-to-r from-purple-500 to-pink-500" :
          "bg-black"
        }`}
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          {style === "classic" && "Welcome to Our Store"}
          {style === "modern" && "New Arrivals 2025"}
          {style === "minimal" && "Shop the Essentials"}
        </h1>
      </section>
    )
  }
  