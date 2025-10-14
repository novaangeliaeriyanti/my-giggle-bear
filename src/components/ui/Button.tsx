"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  desc?: string;
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  outlined: "border border-primary text-primary bg-transparent hover:bg-primary/5",
  ghost: "bg-transparent text-primary hover:bg-primary/5 border border-transparent",
};

const sizeClasses = {
  sm: "px-2 py-1 text-tiny",
  md: "px-3 py-2 text-body",
  lg: "px-4 py-3 text-title",
};

const disabledClasses = "bg-muted text-muted-foreground cursor-not-allowed opacity-50";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      icon,
      desc,
      asChild = false,
      variant = "primary",
      size = "md",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        {...props}
        ref={ref}
        disabled={disabled}
        className={clsx(
          "cursor-pointer rounded-md flex items-center gap-2 font-medium transition-colors duration-300",
          sizeClasses[size],
          disabled ? disabledClasses : variantClasses[variant],
          className
        )}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex flex-col items-start leading-tight text-left">
          <span>{children}</span>
          {desc && <span className="text-button">{desc}</span>}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
