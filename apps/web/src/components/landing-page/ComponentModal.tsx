import React from 'react';
import { PcComponent } from '../../libs/components';

interface ComponentModalProps {
  component: PcComponent;
  onClose: () => void;
  onAddToBuild: (component: PcComponent) => void;
}

export function ComponentModal({
  component,
  onClose,
  onAddToBuild,
}: ComponentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{component.name}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-block bg-gray-100 py-1 px-3 rounded text-sm">
              {component.brand}
            </span>
            <span className="text-xl font-bold text-blue-800 mr-4">
              ${component.price}
            </span>
            {component.rating && (
              <span className="inline-flex items-center bg-gray-100 py-1 px-3 rounded text-sm text-yellow-500">
                {component.rating} ★
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 p-8 rounded">
            <img
              src={component.image}
              alt={component.name}
              className="max-w-full max-h-72 object-contain"
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
              Specifications
            </h4>
            <table className="w-full">
              <tbody>
                {Object.entries(component.specs).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-2 text-gray-600">{key}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {component.features && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                  Key Features
                </h4>
                <ul className="list-inside">
                  {component.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => {
              onAddToBuild(component);
              onClose();
            }}
          >
            Add to Build
          </button>
          <button className="border border-blue-500 text-blue-500 py-3 px-6 rounded hover:bg-blue-50 transition duration-300">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}
