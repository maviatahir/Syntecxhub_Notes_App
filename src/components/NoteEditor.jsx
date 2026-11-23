import { useEffect, useRef, useState } from "react";
import { Check, Pin, X } from "lucide-react";
import { CATEGORIES, NOTE_COLORS } from "../utils/constants";

export default function NoteEditor({ note, onSave, onClose }) {
  const isEditing = Boolean(note);
  const initial = {
    title: note?.title ?? "",
    content: note?.content ?? "",
    category: note?.category ?? "Personal",
    color: note?.color ?? "purple",
    isPinned: note?.isPinned ?? false,
  };
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const isDirty = JSON.stringify(form) !== JSON.stringify(initial);

  // Focus the title once the modal has mounted.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError("Please give your note a title.");
      titleRef.current?.focus();
      return;
    }
    onSave({ ...form, title, content: form.content.trim() });
  };

  // A backdrop click never discards unsaved typing.
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget && !isDirty) onClose();
  };

  const field = "w-full rounded-xl border border-[#E9EDF5] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 dark:border-gray-600 dark:bg-[#111827]";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onMouseDown={handleBackdrop}>
      <form onSubmit={handleSubmit} noValidate role="dialog" aria-modal="true" aria-labelledby="editor-title" className="flex max-h-[95vh] w-full max-w-xl flex-col overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl dark:bg-[#1F2937] sm:rounded-3xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="editor-title" className="text-xl font-semibold">{isEditing ? "Edit note" : "New note"}</h2>
          <button type="button" onClick={onClose} aria-label="Close editor" className="rounded-lg p-2 text-[#64748B] hover:bg-slate-100 dark:hover:bg-white/10"><X size={18} /></button>
        </div>

        <label htmlFor="note-title" className="mb-1.5 text-sm font-medium">Title</label>
        <input id="note-title" ref={titleRef} value={form.title} onChange={(e) => { update("title", e.target.value); setError(""); }} placeholder="Give your note a title..." aria-invalid={Boolean(error)} aria-describedby={error ? "title-error" : undefined} className={field} />
        {error && <p id="title-error" role="alert" className="mt-1.5 text-sm text-red-600">{error}</p>}

        <label htmlFor="note-content" className="mb-1.5 mt-4 text-sm font-medium">Content</label>
        <textarea id="note-content" rows={7} value={form.content} onChange={(e) => update("content", e.target.value)} placeholder="Write your thoughts here..." className={`${field} resize-y`} />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="note-category" className="mb-1.5 block text-sm font-medium">Category</label>
            <select id="note-category" value={form.category} onChange={(e) => update("category", e.target.value)} className={field}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <fieldset>
            <legend className="mb-1.5 text-sm font-medium">Color</legend>
            <div className="flex flex-wrap gap-2.5 py-1.5">
              {Object.entries(NOTE_COLORS).map(([key, c]) => (
                <button key={key} type="button" onClick={() => update("color", key)} aria-label={c.label} aria-pressed={form.color === key} style={{ backgroundColor: c.dot }} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[#6366F1] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366F1] ${form.color === key ? "border-[#6366F1]" : "border-slate-300 dark:border-gray-500"}`}>
                  {form.color === key && <Check size={14} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-medium">
          <input type="checkbox" checked={form.isPinned} onChange={(e) => update("isPinned", e.target.checked)} className="h-4 w-4 accent-[#6366F1]" />
          <Pin size={15} aria-hidden="true" /> Pin this note
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#E9EDF5] px-5 py-2.5 text-sm font-medium dark:border-gray-600">Cancel</button>
          <button type="submit" className="rounded-xl bg-[#6366F1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5558e3]">{isEditing ? "Update Note" : "Save Note"}</button>
        </div>
      </form>
    </div>
  );
}
