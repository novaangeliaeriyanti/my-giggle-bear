"use client";

import * as Switch from "@radix-ui/react-switch";
import clsx from "clsx";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export default function ToggleSwitch({ checked, onChange, label, className }: ToggleSwitchProps) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="w-10 h-6 bg-outlined rounded-full relative data-[state=checked]:bg-primary transition-colors"
      >
        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-md transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
      </Switch.Root>
      {label && <span className="text-small">{label}</span>}
    </div>
  );
}
