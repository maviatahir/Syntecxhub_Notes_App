import { useEffect, useState } from "react";
import { FileText, Pin, SearchX, Tag } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import NotesGrid from "./components/NotesGrid";
import NoteEditor from "./components/NoteEditor";
import DeleteConfirmation from "./components/DeleteConfirmation";
import EmptyState from "./components/EmptyState";
import { useNotes } from "./hooks/useNotes";
import { loadTheme, saveTheme } from "./utils/storage";

export default function App() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes();
  const [theme, setTheme] = useState(loadTheme);
  const [view, setView] = useState("all"); // "all" | "pinned"
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const q = query.trim().toLowerCase();
  const visibleNotes = notes
    .filter((n) => (view === "pinned" ? n.isPinned : true))
    .filter((n) => category === "All" || n.category === category)
    .filter((n) => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || new Date(b.updatedAt) - new Date(a.updatedAt));

  const openNew = () => { setSelectedNote(null); setIsEditorOpen(true); };
  const openEdit = (note) => { setSelectedNote(note); setIsEditorOpen(true); };
  const closeEditor = () => setIsEditorOpen(false);
  const closeDelete = () => setNoteToDelete(null);

  const handleSave = (data) => {
    if (selectedNote) {
      updateNote(selectedNote.id, data);
      setToast("Note updated");
    } else {
      addNote(data);
      setToast("Note saved");
    }
    closeEditor();
  };

  const handleDelete = () => {
    deleteNote(noteToDelete.id);
    setNoteToDelete(null);
    setToast("Note deleted");
  };

  const selectView = (v) => { setView(v); setCategory("All"); setIsSidebarOpen(false); };
  const selectCategory = (c) => { setView("all"); setCategory(c); setIsSidebarOpen(false); };

  const renderEmpty = () => {
    if (notes.length === 0)
      return <EmptyState icon={FileText} title="No notes yet" description="Start with your first note. It only takes a moment." actionLabel="New Note" onAction={openNew} />;
    if (q)
      return <EmptyState icon={SearchX} title="No matching notes" description={`Nothing matches "${query.trim()}". Try a different word or clear the search.`} actionLabel="Clear search" onAction={() => setQuery("")} />;
    if (view === "pinned")
      return <EmptyState icon={Pin} title="No pinned notes" description="Pin a note from its menu to keep it at the top." />;
    return <EmptyState icon={Tag} title={`No ${category} notes`} description="Create a note in this category to see it here." actionLabel="New Note" onAction={openNew} />;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        view={view} category={category} notes={notes} theme={theme} isOpen={isSidebarOpen}
        onSelectView={selectView} onSelectCategory={selectCategory}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="min-w-0 flex-1 space-y-6 p-4 sm:p-6 lg:p-10">
        <Header onNewNote={openNew} onOpenMenu={() => setIsSidebarOpen(true)} />
        <DashboardStats notes={notes} />
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter active={category} onChange={(c) => { setCategory(c); setView("all"); }} />
        {visibleNotes.length > 0 ? (
          <NotesGrid notes={visibleNotes} onEdit={openEdit} onDelete={setNoteToDelete} onTogglePin={togglePin} />
        ) : (
          renderEmpty()
        )}
      </main>

      {isEditorOpen && <NoteEditor key={selectedNote?.id ?? "new"} note={selectedNote} onSave={handleSave} onClose={closeEditor} />}
      {noteToDelete && <DeleteConfirmation note={noteToDelete} onConfirm={handleDelete} onCancel={closeDelete} />}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-[#172033] px-4 py-2.5 text-sm font-medium text-white shadow-lg dark:bg-white dark:text-[#172033]">{toast}</div>}
    </div>
  );
}
