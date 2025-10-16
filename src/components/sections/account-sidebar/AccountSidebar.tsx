"use client";

import { menus, user } from "@/data/auth";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block lg:w-1/4 flex-shrink-0 border border-outlined card-rounded p-4 h-fit">
      <div className="mb-4 flex items-start gap-2">
        <CircleUserRound strokeWidth={1} className="w-10 h-10 text-icon" />
        <div className="flex flex-col">
          <span className="text-small font-bold line-clamp-1">{user.name}</span>
          <span className="text-tiny line-clamp-1">{user.email}</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`block px-3 py-2 rounded-lg transition ${
              pathname === menu.path
                ? "bg-pink-light text-primary text-small"
                : "hover:bg-gray-light text-small"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
