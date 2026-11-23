import { CATEGORIES } from "../utils/constants";

export default function CategoryFilter({ active, onChange }) {
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {["All", ...CATEGORIES].map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={active === c}
          className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-[#6366F1] ${
            active === c
              ? "bg-[#6366F1] text-white"
              : "border border-[#E9EDF5] bg-white text-[#64748B] hover:border-[#6366F1] dark:border-gray-700 dark:bg-[#1F2937] dark:text-gray-300"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
