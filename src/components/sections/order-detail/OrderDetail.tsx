"use client";

import Button from "@/components/ui/Button";
import { order } from "@/data/order";
import { Truck, CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingFee = 15000;
  const total = subtotal + shippingFee - order.voucher.discount;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3 container mx-auto p-4 md:flex-row lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-1">
            <h3 className="text-secondary">Order</h3>
            <h3 className="text-primary">Details</h3>
          </div>
          <div className="relative w-full bg-blue-sky card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-[length:720px] overflow-visible flex flex-col p-4 lg:py-6">
            <div className="flex flex-col gap-2 md:flex-row lg:flex-row md:justify-between lg:justify-between">
              <div className="flex flex-col">
                <h4 className="font-bold">Delivery Status</h4>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-small">Your package has been delivered successfully.</span>
                </div>
              </div>
              <Button
                onClick={() => router.push(`/order/tracking/${id}`)}
                icon={<Truck />}
                className="flex justify-center items-center h-fit !text-tiny"
              >
                View Tracking
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <section className="bg-white border border-outlined card-rounded p-4 space-y-2 lg:py-6">
            <h4 className="font-bold bg-yellow-50 p-2 rounded-lg border border-yellow-400 border-dashed">
              Shipping Information
            </h4>
            <div className="space-y-2 text-small p-2">
              <div>
                <span className="font-medium">Name:</span> {order.shipping.name}
              </div>
              <div>
                <span className="font-medium">Address:</span> {order.shipping.address}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {order.shipping.phone}
              </div>
              <div>
                <span className="font-medium">Method:</span> {order.shipping.method}
              </div>
            </div>
          </section>

          {/* Payment Info */}
          <section className="bg-white border border-outlined card-rounded p-4 space-y-2 lg:py-6">
            <h4 className="font-bold bg-yellow-50 p-2 rounded-lg border border-yellow-400 border-dashed">
              Payment Information
            </h4>
            <div className="space-y-2 text-small p-2 flex flex-col">
              <div>
                <span className="font-medium">Method:</span> {order.payment.method}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span className="text-secondary font-medium">{order.payment.status}</span>
              </div>
              <div>
                <span className="font-medium">Date:</span> {order.payment.date}
              </div>
              <div>
                <span className="font-medium">Total Paid:</span>
                {order.payment.total}
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white border border-outlined card-rounded p-4 space-y-2 flex-1 h-fit md:mt-10 lg:mt-12 lg:py-6">
          <h4 className="font-bold bg-yellow-50 p-2 rounded-lg border border-yellow-400 border-dashed">
            Order Summary
          </h4>
          <div className="p-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 lg:py-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                      <Image
                        src={item.images}
                        alt={item.name}
                        fill
                        className="object-contain hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-small">
                      <div>
                        <span>{item.qty}x </span>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span>color: {item.colors} </span>
                      <span>size: {item.sizes} </span>
                    </div>
                  </div>
                  {order.status === "Delivered" &&
                    (item.isReview ? (
                      <Button
                        onClick={() => router.push(`/order/${id}/add-review`)}
                        icon={<Star />}
                        className="flex justify-center items-center w-fit text-tiny"
                      >
                        review item
                      </Button>
                    ) : (
                      <Button
                        icon={<Star />}
                        className="flex justify-center items-center w-fit text-tiny"
                        disabled={true}
                      >
                        review item
                      </Button>
                    ))}
                </div>
                <span className="text-small">{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-outlined border-dashed mt-4 pt-3 text-small space-y-1 p-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>${shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-primary text-small">
              <span>Voucher ({order.voucher.code})</span>
              <span>- ${order.voucher.discount.toLocaleString()}</span>
            </div>
            <div className="flex font-semibold justify-between border-t pt-3 mt-3 border-outlined">
              <h4>Total</h4>
              <h4>${total.toLocaleString()}</h4>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetail;
