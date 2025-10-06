"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <p className="text-description line-clamp-10">{description}</p>
        <div className="flex justify-end">
            <Button
                onClick={() => setIsOpen(true)}
                icon={<ChevronDown className="w-4 h-4" />}
                desc="Read more"
                className="bg-white !text-text-description hover:!text-primary"
            /> 
        </div>
   
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Product Description"
      >
        {description}
      </Modal>
    </>
  );
};

export default ProductDescription;
