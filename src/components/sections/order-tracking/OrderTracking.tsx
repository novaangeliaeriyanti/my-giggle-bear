"use client";

import { CheckCircle2, Truck, Package, Home } from "lucide-react";
import { tracking } from "@/data/order";
import { JSX } from "react";

const OrderTracking = () => {
  const iconMap: Record<string, JSX.Element> = {
    "check-circle-2": <CheckCircle2 className="text-primary" size={18} />,
    truck: <Truck className="text-primary" size={18} />,
    package: <Package className="text-primary" size={18} />,
    home: <Home className="text-primary" size={18} />,
  };

  return (
    <div className="max-w-3xl container mx-auto p-4 space-y-4">
      <h3 className="text-secondary">Tracking Order</h3>
      <div className="flex flex-col gap-2 text-small">
        <span>
          Order ID: <span className="font-bold">{tracking.orderId}</span>
        </span>
        <span className="font-medium">
          Courier: <span className="font-bold">{tracking.courier}</span>
        </span>
        <span>
          Tracking Number: <span className="font-bold">{tracking.trackingNumber}</span>
        </span>
        <span>
          Estimated Delivery: <span className="font-bold">{tracking.estimatedDelivery}</span>
        </span>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-primary" />
          <span className="text-small">
            Current Status: <span className="font-bold text-primary">{tracking.currentStatus}</span>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mt-10 bg-primary/5 card-rounded p-4">
        <div className="absolute left-8 top-4 bottom-8 w-1 rounded-full bg-primary"></div>
        <div className="space-y-6">
          {tracking.timeline.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-3 w-full">
              <div className="z-10 bg-white rounded-full border border-primary border-dashed p-2 flex-shrink-0">
                {iconMap[item.icon]}
              </div>
              <div className="flex justify-between w-full items-start">
                <div className="flex flex-col">
                  <span className="text-small font-bold">{item.status}</span>
                  <span className="text-tiny">{item.description}</span>
                </div>
                <div className="flex justify-end text-tiny pl-4">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
