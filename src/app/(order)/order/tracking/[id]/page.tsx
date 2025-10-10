import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import OrderTracking from "@/components/sections/order-tracking/OrderTracking";
import { Suspense } from "react";

const OrderDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div></div>}>
          <OrderTracking />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
