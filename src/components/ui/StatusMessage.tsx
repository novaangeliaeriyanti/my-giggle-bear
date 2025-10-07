"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { ReactNode } from "react";

type StatusMessageProps = {
  title: string;
  description: string;
  imageSrc?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonAction?: () => void;
};

export default function StatusMessage({
  title,
  description,
  imageSrc,
  buttonText,
  buttonIcon,
  buttonAction,
}: StatusMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 min-h-[50vh]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={200}
          className="object-contain mb-6 animate-float"
        />
      )}

      <h2 className="text-lg font-semibold text-secondary mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md">{description}</p>

      {buttonText && buttonAction && (
        <Button onClick={buttonAction} icon={buttonIcon} desc={buttonText} />
      )}
    </div>
  );
}
