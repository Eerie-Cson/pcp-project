import { PcComponent } from '../../libs/types/components';
import { ComponentType } from '../../libs/graphql-types/component';

interface ComponentCardProps {
  component: PcComponent<ComponentType>;
  onAddToBuild: (component: PcComponent<ComponentType>) => void;
  onSelect: (component: PcComponent<ComponentType>) => void;
}

export function ComponentCard({
  component,
  onAddToBuild,
  onSelect,
}: ComponentCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:translate-y-[-5px] hover:shadow-md transition duration-300"
      onClick={() => onSelect(component)}
    >
      <div className="mb-4">
        <h4 className="text-base font-medium mb-1">{component.name}</h4>
        <span className="text-sm text-gray-600">{component.brand}</span>
      </div>
      <div className="h-32 flex items-center justify-center mb-4 bg-gray-100 rounded">
        <img
          src={component.image}
          alt={component.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="mb-4">
        {Object.entries(component.specs)
          .slice(0, 3)
          .map(([key, value]) => (
            <div key={key} className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-blue-800">${component.price}</span>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-blue-600 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onAddToBuild(component);
          }}
        >
          Add to Build
        </button>
      </div>
    </div>
  );
}
