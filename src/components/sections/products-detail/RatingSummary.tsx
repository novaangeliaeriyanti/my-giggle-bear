"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Review } from "@/types/types";

export default function RatingSummary({ productReviews }: { productReviews: Review[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const RatingBreakdown = () => (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = productReviews.filter((r) => r.rating === star).length;
        const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-1">
            <div className="flex items-center w-12 gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-1" />
              <span className="text-small font-medium">{star}</span>
            </div>

            <div className="flex-1 h-2 bg-gray-light rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-500 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className="w-10 text-right text-tiny">{count}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="hidden sm:block flex-1 bg-white px-6">
        <RatingBreakdown />
      </div>

      <div className="sm:hidden flex justify-center">
        <div onClick={() => setIsModalOpen(true)} className="text-primary text-tiny font-medium">
          View Rating Details →
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Rating Details">
        <div className="flex flex-col max-h-[400px] overflow-y-auto p-2">
          <RatingBreakdown />
        </div>
      </Modal>
    </>
  );
}
