"use client";

import PaymentForm from "@/components/sections/order/PaymentForm";
import ShippingForm from "@/components/sections/order/ShippingForm";
import { orderSteps } from "@/data/cart";
import { ShippingFormInputs } from "@/types/types";
import { ArrowRight, Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartForm from "./CartForm";
import useOrderStore from "@/stores/orderStore";
import StatusMessage from "@/components/ui/StatusMessage";
import useCartStore from "@/stores/cartStore";
import VoucherSection from "./VoucherSection";
import PageTitle from "@/components/ui/PageTitle";
import Button from "@/components/ui/Button";

const Order = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [countdown, setCountdown] = useState(5);

  const { calcSubtotal, calcTotal, calcDiscount, orders } = useOrderStore();
  const { cart, hasHydrated } = useCartStore();
  const subtotal = calcSubtotal();
  const discountPercent = 10;
  const discount = calcDiscount(discountPercent);
  const shipping = 5;
  const total = calcTotal(shipping, discountPercent);
  const activeStep = parseInt(searchParams.get("step") || "1");
  const isCartEmpty = cart.reduce((acc, item) => acc + item.quantity, 0) <= 0;

  useEffect(() => {
    if (paymentStatus === "success" || paymentStatus === "error") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/order/detail");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, router]);

  useEffect(() => {
    if (activeStep === 3 && !shippingForm) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.replace("/order?step=2");
        setIsRedirecting(false);
      }, 1200);
    }
  }, [activeStep, shippingForm, orders, router]);

  if (!hasHydrated) return null;

  if (isCartEmpty) {
    return (
      <StatusMessage
        title="No Items in Your Cart"
        description="Your cart feels a little lonely. Browse products and add them to your cart to continue shopping!"
        imageSrc="/images/icons/empty-cart.png"
        buttonText="Shop Now!"
        buttonIcon={<Home className="w-4 h-4" />}
        buttonAction={() => router.push("/home1")}
      />
    );
  }

  if (isRedirecting) {
    return (
      <StatusMessage
        title="Please fill in your shipping information"
        description="We need your shipping details before continuing to payment."
        imageSrc="/images/icons/not-found.png"
      />
    );
  }

  if (paymentStatus === "pending") {
    return (
      <StatusMessage
        title="Processing your payment..."
        description="Please wait a few seconds."
        imageSrc="/images/icons/not-found.png"
      />
    );
  }

  if (paymentStatus === "success") {
    return (
      <StatusMessage
        title="Payment Successful!"
        description={`Redirecting you to order history in ${countdown} seconds...`}
        imageSrc="/images/icons/not-found.png"
      />
    );
  }

  if (paymentStatus === "error") {
    return (
      <StatusMessage
        title="Payment Failed"
        description={`Something went wrong. Please try again!. Redirecting you to order history in ${countdown} seconds...`}
        imageSrc="/images/icons/not-found.png"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center container mx-auto p-4 lg:py-6">
      <PageTitle title={orderSteps.find((step) => step.id === activeStep)?.title as string} />
      {/* Steps */}
      <div className="flex flex-row items-center gap-4 lg:gap-16">
        {orderSteps.map((step) => {
          const isActive = step.id <= activeStep;
          const borderColor = isActive ? "border-primary" : "border-outlined";
          const bgColor = isActive ? "bg-primary/5" : "bg-white";
          const badgeColor = isActive ? "text-primary" : "text-gray-500";
          const textColor = isActive ? "text-primary" : "text-gray-500";

          return (
            <div className={`flex items-center gap-2 border-b-2 pb-4 ${borderColor}`} key={step.id}>
              <div
                className={`w-6 h-6 rounded-full p-4 text-body flex items-center justify-center border border-dashed ${bgColor} ${badgeColor} ${borderColor}`}
              >
                {step.id}
              </div>
              <span className={`text-tiny md:text-body lg:text-body ${textColor}`}>
                {step.step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Steps */}
        <div className="w-full lg:w-7/12 border-1 border-outlined p-4 md:p-8 card-rounded flex flex-col gap-8 h-fit">
          {(() => {
            if (activeStep === 1) return <CartForm />;
            if (activeStep === 2) return <ShippingForm setShippingForm={setShippingForm} />;
            if (activeStep === 3) return <PaymentForm onStatusChange={setPaymentStatus} />;
          })()}
        </div>
        {/* Voucher & Summary */}
        <div className="w-full lg:w-5/12 flex flex-col h-max sticky top-36 gap-4">
          <VoucherSection />
          <div className="border-1 border-outlined p-4 md:p-8 card-rounded flex flex-col gap-8">
            <h3>{orderSteps.find((step) => step.id === activeStep)?.summaryTitle}</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-small">Subtotal</span>
                <span className="text-small">${subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-small">Discount(10%)</span>
                <span className="text-small">${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-small">Shipping Fee</span>
                <span className="text-small">${shipping.toFixed(2)}</span>
              </div>
              <hr className="border-outlined border-dashed" />
              <div className="flex justify-between">
                <h4 className="font-bold">Total</h4>
                <h4 className="font-bold">${total.toFixed(2)}</h4>
              </div>
            </div>
            {activeStep === 1 && (
              <Button
                onClick={() => router.push("/order?step=2")}
                variant="primary"
                icon={<ArrowRight />}
                className="flex justify-center"
              >
                Proceed to Shipping
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
