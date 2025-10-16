"use client";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { voucher } from "@/data/homepage";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";

const VoucherBannerV2 = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(voucher.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        toast.error("Failed to copy coupon");
      }
    }
  };

  return (
    <div className="flex justify-center container mx-auto p-4 mt-8">
      <div className="relative w-full border border-icon bg-ivory-white text-primary card-rounded flex items-center border-dashed">
        <div className="absolute -top-8 w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <Image
            src={voucher.icon}
            alt="Voucher Icon"
            width={112}
            height={112}
            className="object-contain animate-float"
          />
        </div>

        <div className="md:ml-16 lg:ml-32 flex-1">
          <div className="flex flex-col gap-1 p-4 md:py-2 lg:py-2 md:flex-row lg:flex-row md:justify-between lg:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-1 text-stroke-3 mb-1 mt-1.5 text-icon">
                {voucher.title}
              </h2>
              <p className="text-body mb-1">{voucher.description}</p>
            </div>
            <div className="flex items-center flex-1 md:justify-end lg:justify-end">
              <Button
                onClick={handleCopy}
                variant="primary"
                icon={copied ? <Check /> : <Copy />}
                className="flex justify-center"
              >
                {voucher.code}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherBannerV2;
