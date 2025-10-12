"use client";

import { Copy, X } from "lucide-react";
import { orders } from "@/data/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { format, differenceInDays, isAfter } from "date-fns";
import { DateRange as DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { toast } from "react-toastify";

const OrdersList = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Failed to copy order ID");
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDateRange([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      },
    ]);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = statusFilter ? order.status === statusFilter : true;

      const start = dateRange[0].startDate;
      const end = dateRange[0].endDate;

      const matchDate =
        start && end ? new Date(order.date) >= start && new Date(order.date) <= end : true;

      return matchSearch && matchStatus && matchDate;
    });
  }, [searchTerm, statusFilter, dateRange]);

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection as Range;

    if (selection.startDate && selection.endDate) {
      const diff = differenceInDays(selection.endDate, selection.startDate);
      if (diff > 7) {
        alert("Maximum range is 7 days.");
        return;
      }
      if (isAfter(selection.endDate, new Date())) {
        alert("End date cannot exceed today.");
        return;
      }
    }

    setDateRange([selection]);
  };

  const hasActiveFilter =
    searchTerm || statusFilter || dateRange[0].startDate || dateRange[0].endDate;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6 relative">
      {/* Title */}
      <div className="flex items-center gap-2">
        <h2 className="text-secondary">My</h2>
        <h2 className="text-primary">Orders</h2>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:flex-wrap">
        <input
          type="text"
          placeholder="Search by ID or product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] border border-outlined rounded-md px-3 py-2 text-small focus:outline-none focus:border-dashed hover:border-dashed focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-auto min-w-[160px] text-small border border-outlined rounded-md px-3 py-2
                  focus:outline-none focus:border-dashed hover:border-dashed
                  focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300
                  appearance-none bg-white"
        >
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="In Transit">In Transit</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full sm:w-auto text-small border border-outlined rounded-md px-3 py-2 text-sm 
                     focus:outline-none focus:border-dashed hover:border-dashed
                     focus:bg-primary/5 hover:bg-primary/5 transition-colors duration-300"
            >
              {dateRange[0].startDate && dateRange[0].endDate ? (
                <>
                  {format(dateRange[0].startDate, "dd MMM yyyy")} -{" "}
                  {format(dateRange[0].endDate, "dd MMM yyyy")}
                </>
              ) : (
                "Select date range"
              )}
            </button>

            {isCalendarOpen && (
              <div className="fixed left-1/2 top-[50%] md:top-auto md:left-auto md:absolute md:mt-2 md:right-1/2 z-50 transform -translate-x-1/2 md:translate-x-0 card-rounded border border-outlined bg-white overflow-hidden w-[90vw] max-w-[670px]">
                <div className="overflow-x-auto">
                  <DateRangePicker
                    ranges={dateRange}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    rangeColors={["#2563EB"]}
                    moveRangeOnFirstSelection={false}
                    months={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2}
                    direction={
                      typeof window !== "undefined" && window.innerWidth < 768
                        ? "vertical"
                        : "horizontal"
                    }
                  />
                </div>

                <div className="flex justify-end p-2 border-t">
                  <button
                    className="text-small hover:text-outlined"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {hasActiveFilter && (
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-1 bg-primary text-white border border-outlined rounded-md px-3 py-2 text-small
                     hover:text-icon focus:text-icon hover:border-primary focus:border-primary 
                     focus:bg-primary/5 hover:bg-primary/5 hover:border-dashed focus:border-dashed 
                     transition-colors duration-300"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ORDER LIST */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length === 0 ? (
          <p className="text-small">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/order/${order.id}`)}
              className="p-5 flex justify-between items-center border border-outlined card-rounded transition hover:border-primary hover:border-dashed cursor-pointer"
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between border-b border-outlined py-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-small border-r border-outlined pr-2">{order.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-small">{order.id}</span>
                      <Copy
                        onClick={(e) => handleCopy(e, order.id)}
                        className="w-4 h-4 text-icon"
                      />
                    </div>
                  </div>
                  <div
                    className={`text-tiny text-white rounded-full px-2 py-1 w-fit ${
                      order.status === "Delivered"
                        ? "bg-secondary"
                        : order.status === "In Transit"
                          ? "bg-yellow-400"
                          : order.status === "Processing"
                            ? "bg-secondary/50"
                            : "bg-primary"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>

                <div className="flex justify-between py-4">
                  <div className="flex flex-col gap-2">
                    {order.items.slice(0, 1).map((item) => (
                      <div key={item.id} className="flex items-start gap-2">
                        <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                          <Image
                            src={item.images}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-small">
                          <div className="flex items-center gap-1">
                            <span>{item.qty}x </span>
                            <span className="font-semibold line-clamp-1">{item.name}</span>
                          </div>
                          <span>color: {item.colors}</span>
                          <span>size: {item.sizes}</span>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 1 && (
                      <span className="text-small">
                        +{order.items.length - 1} other{" "}
                        {order.items.length - 1 > 1 ? "products" : "product"}
                      </span>
                    )}
                  </div>
                  <div className="text-small flex-shrink-9">
                    Total: Rp{<span className="font-bold">{order.total.toLocaleString()}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersList;
