import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import Order from "@/components/sections/order";
import { Suspense } from "react";

const OrderPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
         <Suspense fallback={<div></div>}>
            <Order />
         </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
