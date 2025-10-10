import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import OrderDetail from "@/components/sections/order-detail/OrderDetail";
import { Suspense } from "react";

const OrderDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div></div>}>
          <OrderDetail />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
