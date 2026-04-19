import { useEffect, useState } from "react";
import HeaderT from "./HeaderT";

export default function Todoo({
  onSubmit,
  onUpdate,
  editingTodo,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setContent(editingTodo.content);
      return;
    }

    setTitle("");
    setContent("");
  }, [editingTodo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "" && content.trim() === "") return;

    if (editingTodo) {
      onUpdate({ ...editingTodo, title, content });
      return;
    }

    const notes = { title, content, id: Date.now() };
    onSubmit(notes);
    setTitle("");
    setContent("");
  }

  function handleCancel() {
    setTitle("");
    setContent("");
    onCancelEdit();
  }

  return (
    <>
      <div>
        <HeaderT />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="...Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="...Textcontent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">{editingTodo ? "Update" : "Add"}</button>
          {editingTodo ? (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
