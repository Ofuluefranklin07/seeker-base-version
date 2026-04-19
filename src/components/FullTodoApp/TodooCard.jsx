export default function TodooCard({ todo, onDelete, onEdit }) {
  function handleDelete() {
    onDelete(todo.id);
  }

  function handleEdit() {
    onEdit(todo.id);
  }

  return (
    <>
      <div className="containier">
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </>
  );
}
