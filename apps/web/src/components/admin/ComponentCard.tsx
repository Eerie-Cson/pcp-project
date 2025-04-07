import React from 'react';
import { PcComponent } from '../../libs/types/components';
import { ComponentType } from '../../libs/graphql-types/component';

interface ComponentCardProps {
  component: PcComponent<ComponentType>;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex p-4">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={component.imageUrl}
            alt={component.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-md mb-1">
                {component.type}
              </span>
              <h3 className="font-medium">{component.name}</h3>
              <p className="text-sm text-gray-600">{component.brand}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">${component.price}</p>
              <p className="text-sm text-gray-600">Stock: {component.stock}</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {Object.entries(component.specs || {})
              .slice(0, 2)
              .map(([key, value]) => (
                <p key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex border-t">
        <button className="flex-1 py-2 text-center text-sm hover:bg-gray-50 transition-colors">
          View Details
        </button>
        <button className="flex-1 py-2 text-center text-sm text-green-600 border-l hover:bg-gray-50 transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ComponentCard;
