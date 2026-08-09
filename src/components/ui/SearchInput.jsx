import { Search } from "lucide-react";
export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search",
}) {
  return (
    <form onSubmit={onSubmit} role="search" className="relative">
      <Search
        size={20}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        aria-label="Search products"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-[10px] border border-muted-foreground bg-white pl-10 pr-3 outline-none focus:border-foreground"
      />
    </form>
  );
}
