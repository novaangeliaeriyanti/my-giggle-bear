"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <p className="text-body line-clamp-10">{description}</p>
        <div className="flex justify-end">
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center cursor-pointer text-body hover:text-primary"
          >
            <ChevronDown className="w-4 h-4 flex-shrink-0 space-xs" />
            Read more
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Product Description">
        {description}
      </Modal>
    </>
  );
};

export default ProductDescription;
