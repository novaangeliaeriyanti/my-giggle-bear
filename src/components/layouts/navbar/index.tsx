"use client";
import { Bell, ChevronDown, User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBar from "./SearchBar";
import { menus } from "@/data/navbar";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="w-full">
        {/* Topbar */}
        <div className="border-b border-gray-200 flex items-center justify-center">
          <div className="container flex justify-between py-4 px-4 gap-3">
            <Link href="/">
              <div className="flex items-center">
                <h2 className="text-secondary">Giggle</h2>
                <h2 className="text-primary">Gear</h2>
              </div>
            </Link>
            <div className="flex-1 max-w-2xl">
              <SearchBar />
            </div>
            <div className="flex items-end gap-4">
              <Bell className="cursor-pointer border border-gray-300 rounded-lg text-icon hover:text-hover w-7 h-7 p-1 lg:w-10 lg:h-10 lg:p-2" />
              <ShoppingCartIcon />
              <User2 className="cursor-pointer border border-gray-300 rounded-lg text-icon hover:text-hover w-7 h-7 p-1 lg:w-10 lg:h-10 lg:p-2" />
            </div>
          </div>
        </div>

        {/* Navbar menu */}
        <div onMouseLeave={() => setActiveMenu(null)} className="relative py-3 flex items-center">
          <button
            className="container px-4 md:hidden flex flex-col gap-[4px] z-50 relative"
            onClick={() => {
              setIsOpen(!isOpen);
              setActiveMenu(null);
            }}
          >
            {isOpen ? (
              <div className="w-6 h-[14px] flex items-center justify-center relative">
                <span className="absolute w-6 h-[2px] bg-icon rotate-45 transition-transform duration-300"></span>
                <span className="absolute w-6 h-[2px] bg-icon -rotate-45 transition-transform duration-300"></span>
              </div>
            ) : (
              <>
                <span className="w-6 h-[2px] bg-icon transition-all duration-300"></span>
                <span className="w-6 h-[2px] bg-icon transition-all duration-300"></span>
                <span className="w-6 h-[2px] bg-icon transition-all duration-300"></span>
              </>
            )}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-[fadeDown_0.2s_ease-out]">
              <div className="flex flex-col">
                {menus.map((menu) =>
                  menu.items ? (
                    <div key={menu.title} className="flex flex-col">
                      <button
                        onClick={() => setActiveMenu(activeMenu === menu.title ? null : menu.title)}
                        className="flex justify-between items-center px-4 py-3 text-body "
                      >
                        {menu.title}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeMenu === menu.title ? "rotate-180 text-hover" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown items */}
                      {activeMenu === menu.title && (
                        <div className="pl-6 pr-4 py-2 flex flex-col gap-2 animate-[fadeDown_0.2s_ease-out]">
                          {menu.items.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className="flex items-center gap-2 text-body hover:text-hover transition-colors"
                            >
                              {item.icon && (
                                <Image
                                  src={item.icon}
                                  alt={item.label}
                                  width={18}
                                  height={18}
                                  className="object-contain"
                                />
                              )}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={menu.title}
                      href={menu.href || "/"}
                      className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {menu.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}

          <div className="hidden md:flex md:items-center gap-6 font-medium text-gray-500 mx-auto justify-center">
            {menus.map((menu) =>
              menu.items ? (
                <button
                  key={menu.title}
                  className={`flex items-center gap-1 font-medium text-body group ${activeMenu === menu.title && "!text-hover"}`}
                  onMouseEnter={() => setActiveMenu(menu.title)}
                  onClick={() => setActiveMenu(activeMenu === menu.title ? null : menu.title)}
                >
                  {menu.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-outlined group-hover:text-hover ${
                      activeMenu === menu.title ? "rotate-180 !text-hover" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link key={menu.title} href={menu.href || "/"} className="font-medium main-body">
                  {menu.title}
                </Link>
              )
            )}
            {activeMenu && menus.find((menu) => menu.title === activeMenu)?.items && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50 animate-[fadeDown_0.2s_ease-out]">
                <div className="container mx-auto px-4">
                  <div
                    className="
                      py-6
                      grid gap-x-8 gap-y-3
                      [grid-auto-flow:column]
                      [grid-template-rows:repeat(5,min-content)]
                      justify-start
                    "
                  >
                    {menus
                      .find((menu) => menu.title === activeMenu)
                      ?.items?.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="flex items-center gap-3 text-gray-700 hover:text-hover transition-colors"
                        >
                          {item.icon && (
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          )}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
