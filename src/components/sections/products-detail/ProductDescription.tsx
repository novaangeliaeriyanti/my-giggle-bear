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
            className="cursor-pointer text-primary text-small font-medium hover:underline"
          >
            Read more →
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
