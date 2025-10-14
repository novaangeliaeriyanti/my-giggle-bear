"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { orders } from "@/data/order";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import PageTitle from "@/components/ui/PageTitle";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";

export default function AddReview() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviews, setReviews] = useState(
    order?.items.map((item) => ({
      itemId: item.id,
      rating: 0,
      text: "",
    })) || []
  );

  if (!order) {
    return <div className="max-w-4xl mx-auto p-6">Order not found.</div>;
  }

  const handleRating = (itemId: number, value: number) => {
    setReviews((prev) => prev.map((r) => (r.itemId === itemId ? { ...r, rating: value } : r)));
  };

  const handleTextChange = (itemId: number, text: string) => {
    setReviews((prev) => prev.map((r) => (r.itemId === itemId ? { ...r, text } : r)));
  };

  const handleSubmit = () => {
    toast.success(`Thank you for your feedback! ${isAnonymous ? "(Submitted anonymously)" : ""}`);
  };

  // Group items by brandId
  const itemsByBrand = order.items.reduce<Record<string, typeof order.items>>((acc, item) => {
    if (!acc[item.brandId]) acc[item.brandId] = [];
    acc[item.brandId].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <PageTitle title="Add Review Product" />
      <div className="text-small">
        Order ID: <span className="font-bold">{order.id}</span>
      </div>

      {Object.entries(itemsByBrand).map(([brandId, items]) => (
        <div key={brandId} className="space-y-6 border border-outlined card-rounded p-4 lg:p-6">
          <h4 className="font-bold capitalize bg-yellow-50 p-2 rounded-lg border border-yellow-400 border-dashed">
            {brandId}
          </h4>
          {items.map((item) => {
            const review = reviews.find((r) => r.itemId === item.id);
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 hover:border-dashed hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                    <Image src={item.images} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-1 text-small">
                    <span className="font-semibold line-clamp-1">{item.name}</span>
                    <span>color: {item.colors}</span>
                    <span>size: {item.sizes}</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-tiny">How is the overall quality of this product?</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => handleRating(item.id, star)}
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            review?.rating && review.rating >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-tiny">Write your review</span>
                    <textarea
                      rows={3}
                      placeholder="Write your review..."
                      value={review?.text || ""}
                      onChange={(e) => handleTextChange(item.id, e.target.value)}
                      maxLength={255}
                      className="w-full border border-outlined rounded-md px-3 py-2 text-small focus:outline-none focus:border-dashed focus:bg-primary/5 transition-colors"
                    />
                    <span className="text-xs text-gray-400 text-right">
                      {review?.text?.length || 0}/255
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="flex justify-between">
        <ToggleSwitch checked={isAnonymous} onChange={setIsAnonymous} label="Show as anonymous" />
        <Button onClick={handleSubmit} variant="primary" className="flex justify-center">
          Submit Reviews
        </Button>
      </div>
    </div>
  );
}
