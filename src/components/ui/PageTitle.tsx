import React from "react";
import clsx from "clsx";
import Breadcrumbs from "./Breadscrumbs";

interface PageTitleProps {
  title: string;
  className?: string;
}

export default function PageTitle({ title, className }: PageTitleProps) {
  return (
    <div
      className={clsx(
        "relative w-full flex flex-col gap-2 card-rounded border border-outlined border-dashed bg-ivory-white bg-[length:720px] overflow-visible items-center justify-center p-4 lg:py-6",
        className
      )}
    >
      <h3 className="text-heading-1 text-stroke-3 text-icon">{title}</h3>
      <Breadcrumbs />
    </div>
  );
}
