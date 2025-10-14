"use client";

import {
  BadgePercent,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Info,
  TicketPercent,
  BadgeDollarSign,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Voucher, voucherList } from "@/data/order";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

const VoucherSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [viewDetail, setViewDetail] = useState<Voucher | null>(null);

  const handleApplyVoucher = () => {
    const codeToUse = manualCode.trim();

    if (codeToUse) {
      const found = voucherList.find((v) => v.code.toLowerCase() === codeToUse.toLowerCase());
      if (found) {
        toast.success("Invalid voucher code.");
        setAppliedVoucher(found);
      } else {
        toast.error("Invalid voucher code.");
        return;
      }
    } else if (selectedVoucher) {
      toast.success("Invalid voucher code.");
      setAppliedVoucher(selectedVoucher);
    }
    setIsModalOpen(false);
    setManualCode("");
    setSelectedVoucher(null);
    setViewDetail(null);
  };

  const handleRemoveVoucher = () => setAppliedVoucher(null);

  return (
    <>
      <div className="border-1 border-outlined p-4 md:p-8 card-rounded flex flex-col gap-8 relative">
        <h3>Redeem Your Rewards</h3>

        <div className="flex flex-col gap-2">
          <span className="text-body">Choose vouchers, payment promotions</span>

          {appliedVoucher ? (
            <div className="border border-primary rounded-md bg-primary/5 border-dashed p-4 flex justify-between items-center">
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle size={22} />
                <div>
                  <p className="font-medium">{appliedVoucher.title}</p>
                  <p className="text-sm text-gray-500">{appliedVoucher.code}</p>
                </div>
              </div>

              <button
                onClick={handleRemoveVoucher}
                className="text-sm text-gray-500 hover:text-hover transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsModalOpen(true)}
              className="border-1 border-primary border-dashed rounded-md bg-primary/5 flex items-center justify-between cursor-pointer group transition-colors duration-300 hover:bg-primary/5"
            >
              <div className="flex items-center gap-2 px-3 text-primary">
                <BadgePercent size={24} className="fill-current stroke-white" />
                <span className="!text-gray-500 text-body group-hover:!text-primary transition-colors">
                  Redeem now
                </span>
              </div>

              <div className="border-l-1 border-primary py-2 border-dashed flex justify-center items-center px-2">
                <ChevronRight
                  size={24}
                  className="text-icon group-hover:!text-primary transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setViewDetail(null);
        }}
        title={viewDetail ? "Voucher Detail" : "Vouchers"}
      >
        <div className="flex flex-col max-h-[400px]">
          {!viewDetail ? (
            <>
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-24">
                {/* Manual input */}
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter voucher code"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="flex-1 border border-outlined rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:border-dashed hover:border-dashed"
                  />
                </div>

                {/* List vouchers */}
                {voucherList.map((voucher) => (
                  <div
                    key={voucher.id}
                    onClick={() => setSelectedVoucher(voucher)}
                    className={`border rounded-lg p-4 cursor-pointer transition hover:border-primary hover:border-dashed ${
                      selectedVoucher?.id === voucher.id
                        ? "border-primary bg-primary/5 border-dashed"
                        : "border-outlined"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="line-clamp-1">{voucher.title}</h3>
                        <span className="text-small">{voucher.description}</span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewDetail(voucher);
                          }}
                          className="flex items-center gap-1 text-primary text-tiny group hover:text-primary/50"
                        >
                          <Info className="fill-current stroke-white w-3 h-3" />
                          More info
                        </div>
                        <span className="text-tiny">Valid until {voucher.expiry}</span>
                      </div>
                      <span className="bg-primary/10 text-primary text-sm font-semibold px-2 py-1 rounded">
                        {voucher.code}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky bottom button */}
              <div className="sticky bottom-0 left-0 bg-white pt-4 pb-2">
                <Button
                  onClick={handleApplyVoucher}
                  desc="Apply Voucher"
                  disabled={!selectedVoucher && !manualCode.trim()}
                  className="w-full justify-center"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-24">
                <button
                  onClick={() => setViewDetail(null)}
                  className="flex items-center gap-1 text-small hover:text-primary transition"
                >
                  <ArrowLeft size={16} /> Back to vouchers
                </button>

                <div className=" flex flex-col gap-2">
                  <h3>{viewDetail.title}</h3>
                  <div className="flex flex-col bg-primary/5 rounded-md p-4 gap-2">
                    <div className="flex items-center text-primary gap-2 lg:gap-4">
                      <TicketPercent className="fill-current w-6 h-6 stroke-white flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-tiny">Voucher Code</span>
                        <h4 className="text-primary font-bold">{viewDetail.code}</h4>
                      </div>
                    </div>
                    <div className="flex items-center text-primary gap-2 lg:gap-4">
                      <Clock className=" w-6 h-6 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-tiny">Valid until</span>
                        <span className="text-small">{viewDetail.expiry}</span>
                      </div>
                    </div>

                    {viewDetail?.minSpend > 0 && (
                      <div className="flex items-center text-primary gap-2 lg:gap-4">
                        <BadgeDollarSign className="fill-current w-6 h-6 stroke-white flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-tiny">Min spend</span>
                          <span className="text-small">${viewDetail.minSpend}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-body">{viewDetail.description}</span>
                </div>
              </div>

              {/* Sticky bottom button */}
              <div className="sticky bottom-0 left-0 bg-white pt-4 pb-2">
                <Button
                  onClick={() => {
                    setSelectedVoucher(viewDetail);
                    handleApplyVoucher();
                  }}
                  desc="Apply This Voucher"
                  className="w-full justify-center"
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default VoucherSection;
