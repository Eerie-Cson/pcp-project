import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  visibleItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  visibleItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-6 flex justify-between items-center">
      <p className="text-sm text-gray-600">
        Showing {visibleItems} of {totalItems} components
      </p>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm font-medium">
          {currentPage}
        </button>
        <button
          className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next {totalPages}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
