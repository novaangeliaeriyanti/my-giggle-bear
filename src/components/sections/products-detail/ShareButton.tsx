"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "react-toastify";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(`Failed to copy link because ${err}`);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center p-3 rounded-full border border-gray-200 text-icon w-fit hover:text-hover cursor-pointer"
      >
        <Share2 size={18} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share this product">
        <div className="flex justify-center gap-6 m-6">
          <div className="flex flex-col gap-2 items-center">
            <div
              onClick={handleCopy}
              className="flex items-center p-3 rounded-full border border-gray-200 text-icon w-fit hover:text-hover cursor-pointer"
            >
              <LinkIcon size={24} />
            </div>
            <span className="text-body mt-1">{copied ? "Copied!" : "Copy Link"}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareButton;
