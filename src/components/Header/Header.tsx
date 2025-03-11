import React, { useState } from 'react';

interface HeaderProps {
  onAddTodo: (title: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return;
    }

    onAddTodo(newTodo);
    setNewTodo('');
  };

  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};
