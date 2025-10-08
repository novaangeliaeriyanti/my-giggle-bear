"use client";

import PaymentForm from "@/components/sections/order/PaymentForm";
import ShippingForm from "@/components/sections/order/ShippingForm";
import { orderSteps } from "@/data/cart";
import { ShippingFormInputs } from "@/types/types";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import CartForm from "./CartForm";
import useOrderStore from "@/stores/orderStore";
import StatusMessage from "@/components/ui/StatusMessage";
import useCartStore from "@/stores/cartStore";

const Order = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [countdown, setCountdown] = useState(6);

  const { calcSubtotal, calcTotal, calcDiscount, orders } = useOrderStore();
  const { hasHydrated } = useCartStore();
  const subtotal = calcSubtotal();
  const discountPercent = 10;
  const discount = calcDiscount(discountPercent);
  const shipping = 5;
  const total = calcTotal(shipping, discountPercent);
  const activeStep = parseInt(searchParams.get("step") || "1");

  const handlePaymentStatus = (newStatus: "pending" | "success" | "error") => {
    setPaymentStatus(newStatus);
  };

  useEffect(() => {
    if (paymentStatus === "success" || paymentStatus === "error") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/order-history");
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

    if (activeStep >= 2 && orders.length === 0) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.replace("/order?step=1");
        setIsRedirecting(false);
      }, 1200);
    }
  }, [activeStep, shippingForm, orders, router]);

  if (!hasHydrated) return null;

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
      {/* Title */}
      <div className="relative w-full bg-blue-sky card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-[length:720px] overflow-visible flex items-center justify-center p-4 lg:py-6">
        <h3 className="text-heading-1 text-stroke-3 text-secondary">
          {orderSteps.find((step) => step.id === activeStep)?.title}
        </h3>
      </div>
      {/* Steps */}
      <div className="flex flex-row items-center gap-4 lg:gap-16">
        {orderSteps.map((step) => {
          const isActive = step.id <= activeStep;
          const borderColor = isActive ? "border-primary" : "border-outlined";
          const bgColor = isActive ? "bg-pink-50" : "bg-white";
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

      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Steps */}
        <div className="w-full lg:w-7/12 border-1 border-outlined p-8 card-rounded flex flex-col gap-8">
          {(() => {
            if (activeStep === 1) return <CartForm />;
            if (activeStep === 2) return <ShippingForm setShippingForm={setShippingForm} />;
            if (activeStep === 3) return <PaymentForm onStatusChange={setPaymentStatus} />;
          })()}
        </div>
        {/* Details */}
        <div className="w-full lg:w-5/12 border-1 border-outlined p-8 card-rounded flex flex-col gap-8 h-max sticky top-36">
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
              onClick={() => router.push("/order?step=2", { scroll: false })}
              desc="Proceed to Shipping"
              icon={<ArrowRight className="w-3 h-3" />}
              className="flex justify-center items-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
