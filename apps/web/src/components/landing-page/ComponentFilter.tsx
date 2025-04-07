import React from 'react';
import { ComponentType } from '../../libs/graphql-types/component';
import enumToArray from '../../libs/enumToArray';
import { COMPONENT_TYPES_MAP } from '../../libs/types/components';

interface ComponentFiltersProps {
  selectedType: ComponentType;
  setSelectedType: (type: ComponentType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  componentTypes: ComponentType[];
}

export function ComponentFilters({
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  componentTypes,
}: ComponentFiltersProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">Select Components</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {componentTypes.map((type) => (
            <button
              key={type}
              className={`py-2 px-5 border rounded ${
                selectedType === type
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {COMPONENT_TYPES_MAP[type] || 'All'}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 border border-gray-300 rounded"
        />
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </span>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
