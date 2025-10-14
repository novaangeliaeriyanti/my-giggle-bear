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
        "relative w-full flex flex-col gap-2 bg-blue-sky card-rounded bg-primary-50 bg-[url(/images/icons/grid-line.png)] bg-[length:720px] overflow-visible flex items-center justify-center p-4 lg:py-6",
        className
      )}
    >
      <h3 className="text-heading-1 text-stroke-3 text-secondary">{title}</h3>
      <Breadcrumbs />
    </div>
  );
}
