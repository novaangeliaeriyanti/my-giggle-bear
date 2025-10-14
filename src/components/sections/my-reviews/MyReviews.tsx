"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Star, X } from "lucide-react";
import { myReviews } from "@/data/reviews";
import PageTitle from "@/components/ui/PageTitle";

type TimeFilter = "all" | "7days" | "month" | "3months";

export default function MyReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const parseDate = (dateStr: string) => new Date(dateStr);

  const filteredReviews = useMemo(() => {
    const now = new Date();
    return myReviews
      .map((order) => ({
        ...order,
        items: order.items.filter((item) => {
          const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brandId.toLowerCase().includes(searchTerm.toLowerCase());

          let matchesTime = true;
          const orderDate = parseDate(order.date);

          if (timeFilter === "7days") {
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(now.getDate() - 7);
            matchesTime = orderDate >= sevenDaysAgo;
          } else if (timeFilter === "month") {
            matchesTime =
              orderDate.getMonth() === now.getMonth() &&
              orderDate.getFullYear() === now.getFullYear();
          } else if (timeFilter === "3months") {
            const threeMonthsAgo = new Date(now);
            threeMonthsAgo.setMonth(now.getMonth() - 3);
            matchesTime = orderDate >= threeMonthsAgo;
          }

          return matchesSearch && matchesTime;
        }),
      }))
      .filter((order) => order.items.length > 0)
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  }, [searchTerm, timeFilter]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <PageTitle title="My Reviews" />
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input
          type="text"
          placeholder="Search by product or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-outlined rounded-md px-3 py-2 text-small focus:outline-none focus:border-dashed hover:border-dashed focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300"
        />
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
          className="w-full md:w-auto min-w-[140px] text-small border border-outlined rounded-md px-3 py-2 focus:outline-none focus:border-dashed hover:border-dashed focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300 appearance-none bg-white"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="month">This Month</option>
          <option value="3months">Last 3 Months</option>
        </select>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="flex items-center bg-primary gap-1 text-small text-white border border-outlined rounded-md px-3 py-2 hover:text-icon focus:text-icon hover:border-primary focus:border-primary focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300"
          >
            <X className="w-4 h-4" /> Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-body py-10">No reviews found.</div>
        ) : (
          filteredReviews.map((order) => {
            const hasPendingReview = order.items.some((item) => !item.isReview);

            return (
              <div
                key={order.orderId}
                className="space-y-2 border border-outlined card-rounded overflow-hidden"
              >
                <div className="flex flex-col justify-start md:flex-row md:justify-between gap-2 border-b border-outlined p-4 bg-primary/5">
                  <div className="flex items-center gap-2">
                    <span className="text-small border-r border-outlined pr-2">{order.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-small">{order.orderId}</span>
                      <Copy className="w-4 h-4 text-icon" />
                    </div>
                  </div>
                  {hasPendingReview && (
                    <Link
                      href={`/order/${order.orderId}/add-review`}
                      className="text-sm text-white bg-primary px-3 py-1 rounded-full hover:bg-primary/80 transition-colors w-fit"
                    >
                      Add Review
                    </Link>
                  )}
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col lg:flex-row gap-4 p-4 hover:border-dashed hover:border-primary transition-all duration-300"
                    >
                      <div className="flex items-start gap-2 flex-1 rounded-lg">
                        <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                          <Image
                            src={item.images}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-small">
                          <span className="font-semibold line-clamp-1">{item.name}</span>
                          <span>color: {item.colors}</span>
                          <span>size: {item.sizes}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        {item.isReview ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    item.rating >= star
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-small">{item.text}</p>
                            {item.isAnonymous && (
                              <span className="text-tiny">Submitted anonymously</span>
                            )}
                          </div>
                        ) : (
                          <div className="text-tiny">not yet reviewed</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
