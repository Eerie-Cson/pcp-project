import React from 'react';
import { ComponentType } from '../../libs/graphql-types/component';

interface ComponentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: ComponentType) => void;
  componentTypes: ComponentType[];
  componentTypesMap: Record<string, string>;
}

const ComponentFilters: React.FC<ComponentFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  componentTypes,
  componentTypesMap,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {componentTypes.map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === type
                ? 'bg-blue-400 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveFilter(type)}
          >
            {componentTypesMap[type] || 'All'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComponentFilters;
