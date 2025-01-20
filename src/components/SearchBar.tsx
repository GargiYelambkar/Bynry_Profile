import { Input } from "@/components/ui/input";
import { SearchProps } from "@/lib/types";

const SearchBar = ({ onSearch }: SearchProps) => {
  return (
    <div className="w-full max-w-md mb-6">
      <Input
        type="text"
        placeholder="Search profiles..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;