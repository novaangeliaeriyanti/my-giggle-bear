"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { X, Filter } from "lucide-react";
import { popularProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import FilterContent from "./FilterContent";
import { brands, categories } from "@/data/search";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadscrumbs";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat.toLowerCase())
        ? prev.filter((c) => c !== cat.toLowerCase())
        : [...prev, cat.toLowerCase()]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 100]);
  };

  const filteredProducts = useMemo(() => {
    return popularProducts.filter((product) => {
      const price = product.priceDiscount ?? product.price;
      const matchQuery =
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);
      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brandId.replace("-", " "));
      const matchCategory =
        selectedCategories.length === 0 ||
        product.category.some((cat) => selectedCategories.includes(cat.toLowerCase()));
      const matchPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchQuery && matchBrand && matchCategory && matchPrice;
    });
  }, [query, selectedBrands, selectedCategories, priceRange]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 lg:py-10 ">
      <Breadcrumbs />
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        <Button
          desc="Filters"
          icon={<Filter className="w-4 h-4" />}
          className="flex justify-center items-center h-fit w-fit lg:hidden"
          onClick={() => setShowFilterMobile(true)}
        />

        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block lg:w-1/4 bg-white card-rounded border border-outlined p-4 md:p-8 flex-shrink-0 h-fit">
          <FilterContent
            brands={brands}
            categories={categories}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            toggleBrand={toggleBrand}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            resetFilters={resetFilters}
          />
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-body">
              Search results for: <span className="text-primary">“{query}”</span>
            </span>
            <span className="text-small">{filteredProducts.length} products found</span>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-body">No products found.</div>
          )}
        </div>

        <div
          className={clsx(
            "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300",
            showFilterMobile ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setShowFilterMobile(false)}
        />
        <div
          className={clsx(
            "fixed gap-4 top-0 left-0 h-full w-3/4 max-w-sm bg-white z-50 p-6 overflow-y-auto transform transition-transform duration-300 rounded-r-xl shadow-2xl flex flex-col",
            showFilterMobile ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h4>Filters</h4>
            <button onClick={() => setShowFilterMobile(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <FilterContent
            brands={brands}
            categories={categories}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            toggleBrand={toggleBrand}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            resetFilters={resetFilters}
          />
          <Button
            desc="Apply Filters"
            icon={<Filter className="w-4 h-4" />}
            className="flex justify-center items-center h-fit w-fit"
            onClick={() => {
              setShowFilterMobile(true);
              setShowFilterMobile(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
