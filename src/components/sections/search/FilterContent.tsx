import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

export default function FilterContent({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  toggleBrand,
  toggleCategory,
  priceRange,
  setPriceRange,
  resetFilters,
}: {
  brands: string[];
  categories: string[];
  selectedBrands: string[];
  selectedCategories: string[];
  toggleBrand: (brand: string) => void;
  toggleCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  resetFilters: () => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Brand</h4>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <Checkbox
              key={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              label={brand}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Category</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <Checkbox
              key={cat}
              label={cat}
              checked={selectedCategories.includes(cat.toLowerCase())}
              onChange={() => toggleCategory(cat)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 relative">
        <h4 className="font-semibold mb-2">Price Range</h4>

        <div className="relative h-5">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />

          <div
            className="absolute top-1/2 h-1 bg-primary rounded-full transform -translate-y-1/2"
            style={{
              left: `${priceRange[0]}%`,
              right: `${100 - priceRange[1]}%`,
            }}
          />

          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Math.min(+e.target.value, priceRange[1] - 1), priceRange[1]])
            }
            className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 accent-primary"
          />
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 1)])
            }
            className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 accent-primary"
          />

          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              pointer-events: auto;
              width: 20px;
              height: 20px;
              background: #fff;
              border-radius: 50%;
              cursor: pointer;
              appearance: none;
              border: 2px solid #d1d5db;
            }
          `}</style>
        </div>

        <div className="flex justify-between text-small mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button
        desc="Reset Filters"
        className="flex justify-center items-center h-fit w-fit"
        onClick={resetFilters}
      />
    </div>
  );
}
