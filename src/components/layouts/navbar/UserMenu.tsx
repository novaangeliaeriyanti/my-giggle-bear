"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User2 } from "lucide-react";
import { userMenuItems } from "@/data/navbar";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tutup kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-51" ref={menuRef}>
      <User2
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer border border-primary border-dashed bg-primary/5 rounded-full text-icon hover:text-hover w-7 h-7 p-1 lg:w-10 lg:h-10 lg:p-2 transition-colors duration-300 hover:bg-primary/5"
      />

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg z-50 ring-1 ring-gray-200 p-3 w-48 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-150">
          {userMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-primary/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={18}
                height={18}
                className="object-contain"
              />
              <span className="text-small">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
