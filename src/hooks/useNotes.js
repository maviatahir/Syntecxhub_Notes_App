import { useEffect, useState } from "react";
import { loadNotes, saveNotes } from "../utils/storage";

function createSampleNotes() {
  const now = Date.now();
  const make = (i, title, content, category, color, isPinned) => {
    const stamp = new Date(now - i * 3600_000).toISOString();
    return { id: crypto.randomUUID(), title, content, category, color, isPinned, createdAt: stamp, updatedAt: stamp };
  };
  return [
    make(1, "Learning React Hooks", "useState keeps values between renders.\nuseRef holds a value or DOM node without re-rendering.\nuseEffect syncs with things outside React, like localStorage.", "Learning", "purple", true),
    make(2, "Weekend Plans", "Long walk on Saturday morning, then catch up with friends.\nSunday: meal prep and an hour of reading.", "Personal", "green", false),
    make(3, "Project Ideas", "- Habit tracker with streaks\n- Expense splitter\n- Recipe saver with tags", "Ideas", "yellow", false),
    make(4, "Internship Tasks", "Finish the Notes App, push to GitHub, and write a clear README with screenshots.", "Work", "blue", false),
  ];
}

export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotes(createSampleNotes()));

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (data) => {
    const now = new Date().toISOString();
    setNotes((prev) => [{ ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }, ...prev]);
  };

  const updateNote = (id, data) => {
    const now = new Date().toISOString();
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...data, updatedAt: now } : n)));
  };

  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const togglePin = (id) => {
    const now = new Date().toISOString();
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned, updatedAt: now } : n)));
  };

  return { notes, addNote, updateNote, deleteNote, togglePin };
}
