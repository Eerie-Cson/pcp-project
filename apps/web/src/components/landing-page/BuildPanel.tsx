import React from 'react';
import { PcComponent } from '../../libs/components';

interface BuildPanelProps {
  build: PcComponent[];
  totalPrice: number;
  compatibilityIssues: string[];
  onRemoveComponent: (id: string) => void;
  onClearBuild: () => void;
}

export function BuildPanel({
  build,
  totalPrice,
  compatibilityIssues,
  onRemoveComponent,
  onClearBuild,
}: BuildPanelProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow lg:sticky lg:top-4">
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Your Build
      </h3>
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">Components</span>
            <span className="font-bold">{build.length}/8</span>
          </div>
          <div className="bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">
              Estimate Wattage
            </span>
            <span className="font-bold">750W</span>
          </div>
          <div className="col-span-2 bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">
              Total Price
            </span>
            <span className="font-bold">${totalPrice}</span>
          </div>
        </div>

        {compatibilityIssues.length > 0 && (
          <div className="bg-yellow-100 p-4 rounded mb-6">
            <h4 className="text-yellow-800 font-medium mb-2">
              ⚠️ Compatibility Issues
            </h4>
            <ul className="list-inside">
              {compatibilityIssues.map((issue, i) => (
                <li key={i} className="text-sm text-yellow-800">
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          {build.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Add components to start your build
            </p>
          ) : (
            <ul>
              {build.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">
                      {item.type}
                    </span>
                    <span className="block text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-sm text-blue-800">${item.price}</span>
                  </div>
                  <button
                    className="text-red-500 text-xl px-2 hover:text-red-600"
                    onClick={() => onRemoveComponent(item.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="border border-red-500 text-red-500 py-3 rounded hover:bg-red-50 transition duration-300"
            onClick={onClearBuild}
          >
            Clear Build
          </button>
          <button className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">
            Save Configuration
          </button>
          <button className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
