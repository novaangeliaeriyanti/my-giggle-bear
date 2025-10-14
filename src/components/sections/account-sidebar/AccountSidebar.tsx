"use client";

import { menus } from "@/data/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block lg:w-1/4 flex-shrink-0 border border-outlined card-rounded p-4 h-fit">
      <div className="mb-4">
        <h2 className="font-semibold text-lg">My Account</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`block px-3 py-2 rounded-lg transition ${
              pathname === menu.path
                ? "bg-pink-light text-primary text-body"
                : "hover:bg-gray-light text-body"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
