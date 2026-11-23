import { Menu, Plus } from "lucide-react";

export default function Header({ onNewNote, onOpenMenu }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" className="mt-1 rounded-xl border border-[#E9EDF5] bg-white p-2.5 dark:border-gray-700 dark:bg-[#1F2937] lg:hidden">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-[28px] font-bold leading-tight sm:text-[32px]">Your Thoughts, Organized.</h1>
          <p className="mt-1 text-[15px] text-[#64748B] dark:text-gray-400">Keep your ideas, plans, and inspiration in one place.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onNewNote}
        className="flex items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5558e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366F1]"
      >
        <Plus size={18} aria-hidden="true" /> New Note
      </button>
    </header>
  );
}
