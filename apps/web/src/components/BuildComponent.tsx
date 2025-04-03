import React, { useContext } from 'react';
import { useState } from 'react';
import { PcComponent, ComponentType } from '../libs/components';
import buildUtils from '../hooks/addToBuild';
import { ComponentContext } from './ComponentContext';

export function BuildComponent() {
  const [selectedType, setSelectedType] = useState<ComponentType>('CPU');
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedComponent } = useContext(ComponentContext);

  const { addToBuild, filteredComponents, setPriceRange, priceRange } =
    buildUtils();

  return (
    <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Select Components</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                'CPU',
                'GPU',
                'Motherboard',
                'RAM',
                'Storage',
                'PSU',
                'Case',
                'Cooling',
              ] as ComponentType[]
            ).map((type) => (
              <button
                key={type}
                className={`py-2 px-4 border rounded ${
                  selectedType === type
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
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
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:translate-y-[-5px] hover:shadow-md transition duration-300"
            onClick={() => setSelectedComponent(component)}
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
              <span className="font-bold text-blue-800">
                ${component.price}
              </span>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-blue-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  addToBuild(component);
                }}
              >
                Add to Build
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuildPanel() {
  const { totalPrice, compatibilityIssues, removeFromBuild, build } =
    buildUtils();
  return (
    <div className="bg-white rounded-lg p-6 shadow lg:sticky lg:top-4">
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Your Build
      </h3>
      <div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">Components</span>
            <span className="font-bold">{build.length}/8</span>
          </div>
          <div className="bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">
              Total Price
            </span>
            <span className="font-bold">${totalPrice}</span>
          </div>
          <div className="bg-gray-100 p-3 rounded text-center">
            <span className="block text-sm text-gray-600 mb-1">
              Est. Wattage
            </span>
            <span className="font-bold">750W</span>
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
              {build.map((item: Record<string, any>) => (
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
                    onClick={() => removeFromBuild(item.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button className="border border-red-500 text-red-500 py-3 rounded hover:bg-red-50 transition duration-300">
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
