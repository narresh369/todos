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
      completed: !todo.completed,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">📝 Todo App</h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 text-white px-6 py-2 rounded-r-lg hover:bg-purple-700 transition duration-200"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <span
                onClick={() => toggleComplete(todo)}
                className={`flex-1 cursor-pointer text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 text-sm text-red-500 hover:text-red-700 transition"
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
