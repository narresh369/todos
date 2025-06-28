import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE}/api/todos`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    await axios.post(`${API_BASE}/api/todos`, { title });
    setTitle('');
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`${API_BASE}/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE}/api/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="flex-1 px-4 py-2 border rounded-l"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center py-2 border-b">
              <span
                onClick={() => toggleComplete(todo)}
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
