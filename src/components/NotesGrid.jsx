import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, onEdit, onDelete, onTogglePin }) {
  return (
    <section aria-label="Notes" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onTogglePin={onTogglePin} />
      ))}
    </section>
  );
}
