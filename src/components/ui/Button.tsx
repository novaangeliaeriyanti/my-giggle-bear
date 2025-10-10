import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  desc?: string;
}

export default function Button({ children, className, icon, desc, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-primary text-white px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer text-sm font-medium border border-dashed border-transparent hover:border-primary hover:bg-primary/5  duration-300 hover:text-primary transition-colors",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex flex-col items-start leading-tight text-left">
        <span>{children}</span>
        {desc && <span className="text-button">{desc}</span>}
      </span>
    </button>
  );
}
