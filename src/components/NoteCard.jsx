import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import { NOTE_COLORS } from "../utils/constants";

const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const color = NOTE_COLORS[note.color] ?? NOTE_COLORS.purple;

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const itemClass = "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/10";

  return (
    <article className={`relative flex h-52 flex-col rounded-2xl border border-[#E9EDF5] p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 ${color.bg}`}>
      <button type="button" onClick={() => onEdit(note)} aria-label={`Edit note: ${note.title}`} className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-[#6366F1]" />
      <div className="pointer-events-none flex items-start justify-between gap-2">
        <h2 className="line-clamp-1 text-[17px] font-semibold">{note.title}</h2>
        <div className="pointer-events-auto flex items-center gap-1" ref={menuRef}>
          {note.isPinned && <Pin size={16} aria-label="Pinned" className="text-[#6366F1]" fill="currentColor" />}
          <div className="relative">
            <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-label="More actions" aria-haspopup="menu" aria-expanded={menuOpen} className="relative rounded-lg p-1.5 text-[#64748B] hover:bg-black/5 dark:hover:bg-white/10">
              <MoreHorizontal size={18} />
            </button>
            {menuOpen && (
              <div role="menu" className="absolute right-0 z-10 mt-1 w-40 rounded-xl border border-[#E9EDF5] bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-[#1F2937]">
                <button role="menuitem" type="button" className={itemClass} onClick={() => { setMenuOpen(false); onEdit(note); }}><Pencil size={15} /> Edit</button>
                <button role="menuitem" type="button" className={itemClass} onClick={() => { setMenuOpen(false); onTogglePin(note.id); }}>
                  {note.isPinned ? <PinOff size={15} /> : <Pin size={15} />} {note.isPinned ? "Unpin" : "Pin"}
                </button>
                <button role="menuitem" type="button" className={`${itemClass} text-red-600`} onClick={() => { setMenuOpen(false); onDelete(note); }}><Trash2 size={15} /> Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="pointer-events-none mt-2 line-clamp-4 flex-1 whitespace-pre-line text-[14px] text-[#64748B] dark:text-gray-300">{note.content}</p>
      <div className="pointer-events-none mt-3 flex items-center justify-between text-[12px] text-[#64748B] dark:text-gray-400">
        <span className="rounded-full bg-white/70 px-2.5 py-1 font-medium dark:bg-white/10">{note.category}</span>
        <time dateTime={note.updatedAt}>{formatDate(note.updatedAt)}</time>
      </div>
    </article>
  );
}
