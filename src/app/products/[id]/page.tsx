import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import ProductDetail from "@/components/sections/products-detail";

export default function ProductPage() {
  return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <ProductDetail />
          </div>
          <Footer />
        </div>
  );
}
