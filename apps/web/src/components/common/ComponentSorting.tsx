import React from 'react';

interface ComponentSortingProps {
  sortBy: string;
  sortOrder: string;
  handleSort: (field: string) => void;
}

const ComponentSorting: React.FC<ComponentSortingProps> = ({
  sortBy,
  sortOrder,
  handleSort,
}) => {
  return (
    <div className="flex gap-2 mb-4 text-sm text-gray-600">
      <span>Sort by:</span>
      <button
        className={`hover:text-gray-900 ${sortBy === 'name' ? 'font-semibold text-green-600' : ''}`}
        onClick={() => handleSort('name')}
      >
        Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
      <span>|</span>
      <button
        className={`hover:text-gray-900 ${sortBy === 'price' ? 'font-semibold text-green-600' : ''}`}
        onClick={() => handleSort('price')}
      >
        Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
      <span>|</span>
      <button
        className={`hover:text-gray-900 ${sortBy === 'stock' ? 'font-semibold text-green-600' : ''}`}
        onClick={() => handleSort('stock')}
      >
        Stock {sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
    </div>
  );
};

export default ComponentSorting;
