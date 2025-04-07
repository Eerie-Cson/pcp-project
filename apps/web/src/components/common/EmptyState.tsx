export const EmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="text-center py-12 text-gray-500">
    <svg
      className="w-16 h-16 mx-auto text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <p className="mt-4">No components found matching your criteria</p>
    <button
      className="mt-2 text-green-600 hover:text-green-700"
      onClick={onReset}
    >
      Clear filters
    </button>
  </div>
);
