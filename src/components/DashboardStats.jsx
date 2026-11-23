import { FileText, Layers, Pin } from "lucide-react";

export default function DashboardStats({ notes }) {
  const stats = [
    { label: "Total Notes", value: notes.length, icon: FileText },
    { label: "Pinned Notes", value: notes.filter((n) => n.isPinned).length, icon: Pin },
    { label: "Categories Used", value: new Set(notes.map((n) => n.category)).size, icon: Layers },
  ];
  return (
    <section aria-label="Statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1F2937]">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#6366F1] dark:bg-indigo-500/15">
            <Icon size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="text-2xl font-bold leading-none">{value}</p>
            <p className="mt-1 text-[13px] text-[#64748B] dark:text-gray-400">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
