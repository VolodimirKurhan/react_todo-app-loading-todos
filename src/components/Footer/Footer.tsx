import React from 'react';

interface FooterProps {
  count: number;
  filter: string;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  count,
  filter,
  setFilter,
  clearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {['all', 'active', 'completed'].map(type => (
          <a
            key={type}
            href={`#/${type}`}
            className={`filter__link ${filter === type ? 'selected' : ''}`}
            onClick={() => setFilter(type as 'all' | 'active' | 'completed')}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
