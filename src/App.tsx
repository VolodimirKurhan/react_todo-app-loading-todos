import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { addTodo, deleteTodo, getTodos, updateTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Не вдалося завантажити тудушки'));
  }, []);

  const filteredTodos = todos.filter(todo =>
    filter === 'active'
      ? !todo.completed
      : filter === 'completed'
        ? todo.completed
        : true,
  );

  const handleAddTodo = (title: string) => {
    addTodo(title)
      .then(todo => setTodos(prev => [...prev, todo]))
      .catch(() => setError('Помилка додавання'));
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
      .then(() => setTodos(prev => prev.filter(todo => todo.id !== id)))
      .catch(() => setError('Помилка видалення'));
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    updateTodo(id, { completed: !completed })
      .then(() =>
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, completed: !completed } : todo,
          ),
        ),
      )
      .catch(() => setError('Помилка оновлення'));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header onAddTodo={handleAddTodo} />
        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
        <Footer
          count={filteredTodos.length}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={() => setTodos(todos.filter(todo => !todo.completed))}
        />
      </div>
      {error && <div className="notification is-danger">{error}</div>}
    </div>
  );
};
