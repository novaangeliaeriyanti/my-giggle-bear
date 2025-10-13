"use client";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { popularProducts } from "@/data/products";

const popularKeywords = ["Nike", "T-shirt", "Sneakers", "Jacket", "Kids Wear"];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredProducts = popularProducts.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} className="items-center">
      <div className="flex items-center gap-2 rounded-full ring-1 ring-outlined py-2 px-3 lg:py-3 lg:px-4 w-full bg-white">
        <Search className="w-4 h-4 text-icon" />
        <input
          ref={inputRef}
          id="search"
          placeholder="Search for products"
          className="text-body outline-0 placeholder:text-outlined flex-1"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {showSuggestions && (
        <div className="absolute top-full mt-2 max-w-3xl lg:max-w-7xl bg-white shadow-lg rounded-lg z-51 ring-1 ring-gray-100 p-3 flex flex-col gap-3">
          <div>
            <p className="text-tiny font-semibold mb-2 text-primary">Popular Keyword</p>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setQuery(keyword);
                    router.push(`/search?query=${encodeURIComponent(keyword)}`);
                    setShowSuggestions(false);
                  }}
                  className="px-3 py-1 rounded-full text-tiny text-gray-500 bg-primary/10 hover:text-primary transition"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <p className="text-tiny font-semibold mb-2 text-primary">Popular Products</p>
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
              {filteredProducts.slice(0, 5).map((item) => {
                const firstImage =
                  typeof item.images === "string" ? item.images : Object.values(item.images)[0];

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      router.push(`/product/${item.id}`);
                      setShowSuggestions(false);
                    }}
                    className="flex items-start gap-2 cursor-pointer hover:bg-primary/5 hover:border p-2 rounded-lg transition"
                  >
                    <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                      <Image src={firstImage} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="text-tiny line-clamp-1 text-gray-700">{item.name}</span>
                      {item.discount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-tiny text-gray-700 font-bold">
                            ${item.priceDiscount?.toFixed(2)}
                          </span>
                          <span className="line-through text-tiny text-gray-400">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-tiny text-gray-700">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
