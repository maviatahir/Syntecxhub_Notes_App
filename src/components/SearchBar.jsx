import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">Search notes</label>
      <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or content..."
        className="w-full rounded-xl border border-[#E9EDF5] bg-white py-3 pl-11 pr-11 text-[15px] outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 dark:border-gray-700 dark:bg-[#1F2937]"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#64748B] hover:bg-slate-100 dark:hover:bg-white/10">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
