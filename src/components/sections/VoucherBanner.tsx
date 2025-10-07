"use client"
import Image from "next/image";
import Button from "../ui/Button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { voucher } from "@/data/homepage";

const VoucherBanner = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(voucher.code)
        .then(() => setCopied(true))
        .catch((err) => console.error("Gagal menyalin kode:", err));
    }
  };

  return (
    <div className="flex justify-center container mx-auto p-4 mt-8">
      <div className="relative w-full bg-blue-sky text-primary card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-cover overflow-visible flex items-center">
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
                  <h2 className="text-heading-1 text-stroke-3 mb-1 mt-1.5 text-secondary">
                      {voucher.title}
                  </h2>                
                  <p className="text-body mb-1">
                      {voucher.description}
                  </p>
              </div>
              <div className="flex items-center flex-1 md:justify-end lg:justify-end">
                  <Button className="w-full flex justify-center items-center md:w-fit lg:justify-end lg:w-fit" onClick={handleCopy}>
                    {copied ? (
                      <div className="flex items-center gap-1 font-bold">
                          <Check className="w-4 h-4" /> {voucher.code}
                      </div>
                      ) : (
                      <div className="flex items-center gap-1 font-bold">
                          <Copy className="w-4 h-4" /> {voucher.code}
                      </div>
                    )}
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherBanner