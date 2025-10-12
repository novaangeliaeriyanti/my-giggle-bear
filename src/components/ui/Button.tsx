import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  desc?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  icon,
  desc,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium border border-dashed border-transparent transition-colors duration-300",
        disabled
          ? "bg-outlined text-white cursor-not-allowed border-transparent"
          : "bg-primary text-white cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary",
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
