"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { productReview, reviews } from "@/data/reviews";
import { useParams } from "next/navigation";
import RatingSummary from "./RatingSummary";
import PageTitle from "@/components/ui/PageTitle";

export default function ProductAllReview() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const [timeFilter, setTimeFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const productReviews = reviews.filter((r) => r.productId === productId);

  // hitung rating rata-rata
  const avgRating =
    productReviews.reduce((sum, r) => sum + r.rating, 0) / (productReviews.length || 1);

  // filter waktu dan rating
  const filteredReviews = productReviews.filter((review) => {
    const today = new Date("October 12, 2025");
    const reviewDate = new Date(review.date);
    const diffDays = Math.floor((today.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));

    const matchTime =
      timeFilter === "all" ||
      (timeFilter === "7days" && diffDays <= 7) ||
      (timeFilter === "month" && diffDays <= 30) ||
      (timeFilter === "3months" && diffDays <= 90);

    const matchRating = ratingFilter ? review.rating === ratingFilter : true;

    return matchTime && matchRating;
  });

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 lg:py-6 max-w-5xl">
      <PageTitle title="Product Review" />
      <div className="flex bg-gray-light flex-col rounded-2xl overflow-hidden">
        <div className="flex-1 px-6 py-2">
          <div className="flex items-start gap-2 flex-1">
            <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
              <Image
                src={productReview.images}
                alt={productReview.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-small">
              <span className="font-semibold line-clamp-1">{productReview.name}</span>
              {productReview.discount ? (
                <div className="flex items-center gap-2">
                  <span className="text-small font-bold text-gray-700">
                    ${productReview.priceDiscount?.toFixed(2)}
                  </span>
                  <span className="line-through text-tiny">${productReview.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-bold text-small text-gray-700">
                  ${productReview.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white px-6 border border-outlined rounded-2xl py-6 flex justify-between">
          <div>
            <h4 className="font-semibold mb-2">Overall Rating</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(avgRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-small font-medium">{avgRating.toFixed(1)} / 5</span>
            </div>
            <p className="text-tiny mt-1">({productReviews.length} total reviews)</p>
          </div>
          <RatingSummary productReviews={reviews} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 flex-shrink-0">
          <div className="border border-outlined rounded-2xl p-4 bg-white space-y-6 sticky top-36">
            <div>
              <h4 className="font-semibold mb-3">Filter by Time</h4>
              <div className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto">
                {[
                  { id: "all", label: "All Time" },
                  { id: "7days", label: "Last 7 Days" },
                  { id: "month", label: "This Month" },
                  { id: "3months", label: "Last 3 Months" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setTimeFilter(item.id)}
                    className={`px-3 py-2 text-small rounded-md border transition-colors ${
                      timeFilter === item.id
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter rating */}
            <div>
              <h3 className="font-semibold text-base mb-3">Filter by Rating</h3>
              <div className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto">
                <div
                  onClick={() => setRatingFilter(null)}
                  className={`px-3 py-2 text-small rounded-md border transition-colors ${
                    ratingFilter === null
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  All Ratings
                </div>

                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    onClick={() => setRatingFilter(rating)}
                    className={`px-3 py-2 text-sm rounded-md border flex items-center gap-1 transition-colors ${
                      ratingFilter === rating
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    <span>{rating}</span>
                    <Star
                      className={`w-4 h-4 ${
                        ratingFilter === rating
                          ? "fill-white text-white"
                          : "fill-yellow-400 text-yellow-400"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Reviews List */}
        <section className="flex-1 flex flex-col gap-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No reviews found for this filter.</div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="overflow-hidden bg-white rounded-2xl border border-outlined flex flex-col gap-3 hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute top-0 right-0 bg-yellow-50 border border-outlined rounded-bl-xl rounded-tr-xl p-2 lg:px-4 lg:py-2 z-10">
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
                  <div className="flex items-center gap-3">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={50}
                      height={50}
                      className="object-cover w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800 text-small">{review.name}</span>
                      <span className="text-tiny text-gray-400">{review.date}</span>
                    </div>
                  </div>

                  <p className="text-small text-gray-700 leading-relaxed">“{review.comment}”</p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
