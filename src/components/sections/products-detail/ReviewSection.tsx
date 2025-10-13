"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const productReviews = reviews.filter((r) => r.productId === productId);
  const displayedReviews = productReviews.slice(0, 3); // tampilkan 3 dulu

  if (productReviews.length === 0) {
    return (
      <div className="border-t border-outlined pt-6 mt-10 text-center text-gray-500 text-sm">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <section className="mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Customer Reviews</h3>
        {productReviews.length > 3 && (
          <Link
            href={`/products/${productId}/reviews`}
            className="text-primary text-small font-medium hover:underline"
          >
            View all reviews →
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="flex-shrink-0 overflow-hidden bg-white card-rounded border border-gray-200 flex flex-col gap-3"
          >
            <div className="relative">
              <div className="absolute top-0 right-0 text-tiny font-bold bg-yellow-50 border border-gray-200 text-white rounded-bl-xl rounded-tr-xl lg:rounded-tr-3xl p-1 lg:px-4 lg:py-2 z-10">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5 pt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="object-cover w-16 h-16"
                />
                <span className="text-body text-secondary line-clamp-2">{review.name}</span>
              </div>
              <span className="text-small line-clamp-3">“{review.comment}”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
