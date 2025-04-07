import React from 'react';

interface ComponentListHeaderProps {
  onAddComponent: () => void;
}

const ComponentListHeader: React.FC<ComponentListHeaderProps> = ({
  onAddComponent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h2 className="text-2xl font-semibold">Components Inventory</h2>
      <button
        onClick={onAddComponent}
        className="mt-2 sm:mt-0 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-blue-500 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add New Component
      </button>
    </div>
  );
};

export default ComponentListHeader;
