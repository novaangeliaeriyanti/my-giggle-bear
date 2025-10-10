import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar";
import OrdersList from "@/components/sections/orders-list/OrdersList";
import { Suspense } from "react";

const OrdersListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<div></div>}>
          <OrdersList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersListPage;
