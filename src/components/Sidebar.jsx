import { BookOpen, Moon, NotebookPen, Pin, Sun, Tag, X } from "lucide-react";
import { CATEGORIES } from "../utils/constants";

function NavItem({ icon: Icon, label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-[#6366F1] ${
        active
          ? "bg-indigo-50 text-[#6366F1] dark:bg-indigo-500/15 dark:text-indigo-300"
          : "text-[#64748B] hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-white/5"
      }`}
    >
      <Icon size={18} aria-hidden="true" />
      <span className="flex-1 text-left">{label}</span>
      <span className="text-xs tabular-nums">{count}</span>
    </button>
  );
}

export default function Sidebar({ view, category, notes, theme, isOpen, onSelectView, onSelectCategory, onToggleTheme, onClose }) {
  const pinnedCount = notes.filter((n) => n.isPinned).length;
  const countFor = (c) => notes.filter((n) => n.category === c).length;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-[#E9EDF5] bg-white p-5 transition-transform duration-200 dark:border-gray-700 dark:bg-[#172033] lg:static lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white">
              <NotebookPen size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-bold leading-tight">NoteFlow</p>
              <p className="text-xs text-[#64748B] dark:text-gray-400">Your personal space for ideas</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-[#64748B] hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Notes navigation" className="flex-1 space-y-1 overflow-y-auto">
          <NavItem icon={BookOpen} label="All Notes" count={notes.length} active={view === "all" && category === "All"} onClick={() => onSelectView("all")} />
          <NavItem icon={Pin} label="Pinned Notes" count={pinnedCount} active={view === "pinned"} onClick={() => onSelectView("pinned")} />
          <p className="px-3 pb-1 pt-5 text-xs font-semibold text-[#64748B] dark:text-gray-400">Categories</p>
          {CATEGORIES.map((c) => (
            <NavItem key={c} icon={Tag} label={c} count={countFor(c)} active={view === "all" && category === c} onClick={() => onSelectCategory(c)} />
          ))}
        </nav>

        <div className="mt-6 border-t border-[#E9EDF5] pt-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#64748B] transition hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-white/5"
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <p className="mt-3 px-3 text-xs text-[#64748B] dark:text-gray-400">Notes are saved in this browser. v1.0</p>
        </div>
      </aside>
    </>
  );
}
