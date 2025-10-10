import React from 'react';
import { ComponentType } from '../../libs/graphql-types/component';
import { COMPONENT_TYPES_MAP, PcComponent } from '../../libs/types/components';

interface ComponentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: PcComponent<ComponentType> | null;
}

const ComponentDetailsModal: React.FC<ComponentDetailsModalProps> = ({
  isOpen,
  onClose,
  component,
}) => {
  if (!isOpen || !component) return null;

  const formatSpecKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const formatSpecValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (key.toLowerCase().includes('clock') && typeof value === 'string') {
      return `${value} ${key.toLowerCase().includes('core') ? 'GHz' : 'MHz'}`;
    }
    if (
      (key.toLowerCase().includes('memory') ||
        key.toLowerCase().includes('capacity')) &&
      typeof value === 'string'
    ) {
      return `${value} GB`;
    }
    if (
      (key.toLowerCase().includes('tdp') ||
        key.toLowerCase().includes('wattage')) &&
      typeof value === 'string'
    ) {
      return `${value} W`;
    }
    if (key.toLowerCase().includes('speed') && typeof value === 'string') {
      return `${value} MHz`;
    }
    return value?.toString() || 'N/A';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">Component Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Component Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
                <img
                  src={component.image}
                  alt={component.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                  {COMPONENT_TYPES_MAP[component.type]}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {component.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{component.brand}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${component.price}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Stock</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {component.stock}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Part Number</p>
                <p className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">
                  {component.partNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 border-b pb-2 flex items-center">
              <span className="text-green-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Technical Specifications
            </h3>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {Object.entries(component.specs || {}).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`p-5 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } ${
                        index < Object.keys(component.specs || {}).length - 1 &&
                        (index <
                          Object.keys(component.specs || {}).length - 2 ||
                          Object.keys(component.specs || {}).length % 2 === 0)
                          ? 'border-b md:border-b-0'
                          : ''
                      } ${
                        index % 2 === 0 &&
                        index < Object.keys(component.specs || {}).length - 1
                          ? 'md:border-r border-gray-200'
                          : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          {formatSpecKey(key)}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatSpecValue(key, value)}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {/* {component.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {component.description}
                </p>
              </div>
            </div>
          )} */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 border-t pt-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailsModal;
