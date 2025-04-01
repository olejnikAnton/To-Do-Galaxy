interface Todo {
  id: number;
  ready: boolean;
  text: string;
  difficult: number;
  create_at: string;
  completion_date: string;
}

interface TodoTableProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoTable({ todos, onToggle, onDelete }: TodoTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Difficulty</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <label>
                <input
                  type="checkbox"
                  checked={todo.ready}
                  onChange={() => onToggle(todo.id)}
                />
              </label>
            </td>
            <td>{todo.text}</td>
            <td className="difficulty">{todo.difficult}/10</td>
            <td className="completion-date">{todo.completion_date}</td>
            <td>
              <button className="delete-btn" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
