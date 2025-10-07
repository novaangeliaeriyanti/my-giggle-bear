import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full ring-1 ring-outlined py-2 px-3 lg:py-3 lg:px-4">
      <Search className="w-4 h-4 text-icon" />
      <input
        id="search"
        placeholder="Search for products"
        className="text-body outline-0 placeholder:text-outlined"
      ></input>
    </div>
  );
};

export default SearchBar;
