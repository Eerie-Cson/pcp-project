import React, { useState } from 'react';

interface ComponentAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (componentData: any) => void;
}

const CreateComponentButton: React.FC<ComponentAddModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState('CPU');
  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    brand: '',
    price: '',
    stock: '',
    specs: {},
  });

  const componentTypes = [
    'CPU',
    'GPU',
    'Motherboard',
    'RAM',
    'Storage',
    'PSU',
    'Case',
    'Cooling',
  ];

  // Different spec fields for each component type
  const specFields: Record<string, Record<string, any>[]> = {
    CPU: [
      { name: 'cores', label: 'Cores/Threads' },
      { name: 'baseClock', label: 'Base Clock (GHz)' },
      { name: 'boostClock', label: 'Boost Clock (GHz)' },
      { name: 'socket', label: 'Socket' },
      { name: 'tdp', label: 'TDP (W)' },
    ],
    GPU: [
      { name: 'vram', label: 'VRAM (GB)' },
      { name: 'coreClock', label: 'Core Clock (MHz)' },
      { name: 'boostClock', label: 'Boost Clock (MHz)' },
      { name: 'interface', label: 'Interface' },
      { name: 'tdp', label: 'TDP (W)' },
    ],
    Motherboard: [
      { name: 'socket', label: 'Socket' },
      { name: 'chipset', label: 'Chipset' },
      { name: 'formFactor', label: 'Form Factor' },
      { name: 'memorySlots', label: 'Memory Slots' },
    ],
    RAM: [
      { name: 'capacity', label: 'Capacity (GB)' },
      { name: 'speed', label: 'Speed (MHz)' },
      { name: 'type', label: 'Type' },
      { name: 'modules', label: 'Modules' },
    ],
    Storage: [
      { name: 'capacity', label: 'Capacity' },
      { name: 'type', label: 'Type' },
      { name: 'interface', label: 'Interface' },
      { name: 'readSpeed', label: 'Read Speed' },
    ],
    PSU: [
      { name: 'wattage', label: 'Wattage' },
      { name: 'efficiency', label: 'Efficiency Rating' },
      { name: 'modular', label: 'Modular Type' },
    ],
    Case: [
      { name: 'formFactor', label: 'Form Factor' },
      { name: 'fans', label: 'Included Fans' },
      { name: 'maxGpuLength', label: 'Max GPU Length (mm)' },
    ],
    Cooling: [
      { name: 'type', label: 'Type' },
      { name: 'tdpRating', label: 'TDP Rating (W)' },
      { name: 'fanSize', label: 'Fan Size (mm)' },
    ],
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSpecChange = (specName: string, value: string) => {
    setFormData({
      ...formData,
      specs: {
        ...formData.specs,
        [specName]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: activeTab, ...formData });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      stock: '',
      specs: {},
    });
    setActiveTab('CPU');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">Add Component</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
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
          {/* Component Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
            {componentTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === type
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => setActiveTab(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Component Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand:
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($):
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity:
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            {/* Component-specific specs */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">
                {activeTab} Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specFields[activeTab].map((spec) => (
                  <div key={spec.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {spec.label}:
                    </label>
                    <input
                      type="text"
                      value={formData.specs[spec.name] || ''}
                      onChange={(e) =>
                        handleSpecChange(spec.name, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description:
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleInputChange}
                value={formData.description || ''}
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Component Image:
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drop image here or click to upload
                  </p>
                  <input type="file" className="hidden" id="fileInput" />
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800"
                    onClick={() =>
                      document.getElementById('fileInput')?.click()
                    }
                  >
                    Select File
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 border-t pt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500"
              >
                Add Component
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComponentButton;
