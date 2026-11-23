import { useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteConfirmation({ note, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-desc" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#1F2937]">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/15"><Trash2 size={20} /></div>
        <h2 id="delete-title" className="text-lg font-semibold">Delete this note?</h2>
        <p id="delete-desc" className="mt-1 text-sm text-[#64748B] dark:text-gray-400">"{note.title}" will be removed permanently. This can't be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-[#E9EDF5] px-4 py-2.5 text-sm font-medium dark:border-gray-600">Cancel</button>
          <button type="button" onClick={onConfirm} autoFocus className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700">Delete note</button>
        </div>
      </div>
    </div>
  );
}
