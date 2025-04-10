import React, { useState } from 'react';
import enumToArray from '../../libs/enumToArray';
import { ComponentType } from '../../libs/graphql-types/component';
import { COMPONENT_TYPES_MAP } from '../../libs/types/components';

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
  const [activeTab, setActiveTab] = useState<ComponentType>(ComponentType.Case);
  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    brand: '',
    price: '',
    partNumber: '',
    specs: {},
  });

  const componentTypes = enumToArray<ComponentType>(ComponentType);
  const specFields: Record<string, Record<string, any>[]> = {
    [ComponentType.Cpu]: [
      { name: 'cores', label: 'Cores/Threads', inputType: 'number' },
      { name: 'coreClock', label: 'Core Clock (GHz)', inputType: 'text' },
      { name: 'series', label: 'Series', inputType: 'text' },
      { name: 'socket', label: 'Socket', inputType: 'text' },
      { name: 'tdp', label: 'TDP (W)', inputType: 'text' },
      {
        name: 'microarchitecture',
        label: 'Microarchitecture',
        inputType: 'text',
      },
      { name: 'coreFamily', label: 'Core Family', inputType: 'text' },
      {
        name: 'integratedGraphics',
        label: 'Integrated Graphics',
        inputType: 'text',
      },
      {
        name: 'packaging',
        label: 'Packaging Type',
        inputType: 'select',
        options: ['BOXED'],
      },
      { name: 'cooler', label: 'Cooler Included', inputType: 'checkbox' },
    ],
    [ComponentType.VideoCard]: [
      { name: 'vram', label: 'VRAM (GB)' },
      { name: 'coreClock', label: 'Core Clock (MHz)' },
      { name: 'boostClock', label: 'Boost Clock (MHz)' },
      { name: 'interface', label: 'Interface' },
      { name: 'tdp', label: 'TDP (W)' },
    ],
    [ComponentType.Motherboard]: [
      { name: 'socket', label: 'Socket' },
      { name: 'chipset', label: 'Chipset' },
      { name: 'formFactor', label: 'Form Factor' },
      { name: 'memorySlots', label: 'Memory Slots' },
    ],
    [ComponentType.Memory]: [
      { name: 'formFactor', label: 'Form Factor' },
      { name: 'speed', label: 'Speed (MHz)' },
      { name: 'voltage', label: 'Voltage (V)' },
      { name: 'modules', label: 'Modules' },
      { name: 'color', label: 'Color' },
      { name: 'heatSpreader', label: 'Heat Spreader', inputType: 'checkbox' },
    ],
    [ComponentType.Storage]: [
      { name: 'capacity', label: 'Capacity' },
      { name: 'type', label: 'Type' },
      { name: 'interface', label: 'Interface' },
      { name: 'readSpeed', label: 'Read Speed' },
    ],
    [ComponentType.PowerSupply]: [
      { name: 'wattage', label: 'Wattage' },
      { name: 'efficiency', label: 'Efficiency Rating' },
      { name: 'modular', label: 'Modular Type' },
    ],
    [ComponentType.Case]: [
      {
        name: 'type',
        label: 'Case Type',
        inputType: 'select',
        options: ['ATX_MID_TOWER', 'EATX', 'ATX', 'MICRO_ATX', 'MINI_ITX'],
      },
      {
        name: 'sidePanel',
        label: 'Side Panel Type',
        inputType: 'select',
        options: ['TEMPERED_GLASS', 'TINTED_TEMPERED_GLASS'],
      },

      { name: 'formFactor', label: 'Form Factor', inputType: 'text' },
      { name: 'interface', label: 'Interface', inputType: 'text' },
      { name: 'color', label: 'Color', inputType: 'color' },

      {
        name: 'powerSupply',
        label: 'Power Supply Included',
        inputType: 'checkbox',
      },
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

  const handleSpecChange = (specName: string, value: string | boolean) => {
    setFormData({
      ...formData,
      specs: {
        ...formData.specs,
        [specName]: value,
      },
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    specName: string,
  ) => {
    handleSpecChange(specName, e.target.value);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    specName: string,
  ) => {
    handleSpecChange(specName, e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSpecs = { ...formData.specs };

    specFields[activeTab].forEach((spec) => {
      if (updatedSpecs[spec.name] === undefined) {
        if (spec.inputType === 'checkbox') updatedSpecs[spec.name] = false;
        else if (spec.inputType === 'color')
          updatedSpecs[spec.name] = '#000000';
      }
    });

    onSubmit({ type: activeTab, ...formData, specs: updatedSpecs });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      partNumber: '',
      specs: {},
    });
    setActiveTab(ComponentType.Case);
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
                {COMPONENT_TYPES_MAP[type]}
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
                  Part Number:
                </label>
                <input
                  type="string"
                  name="partNumber"
                  value={formData.partNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            {/* Component-specific specs */}
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
                {COMPONENT_TYPES_MAP[activeTab]} Specifications
              </h3>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {specFields[activeTab].map((spec, index) => (
                    <div
                      key={spec.name}
                      className={`p-5 relative ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } ${
                        index < specFields[activeTab].length - 1 &&
                        (index < specFields[activeTab].length - 2 ||
                          specFields[activeTab].length % 2 === 0)
                          ? 'border-b md:border-b-0'
                          : ''
                      } ${
                        index % 2 === 0 &&
                        index < specFields[activeTab].length - 1
                          ? 'md:border-r border-gray-200'
                          : ''
                      }`}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {spec.label}
                        {spec.name === 'tdp' && (
                          <span className="ml-1 text-xs text-gray-500">
                            (Thermal Design Power)
                          </span>
                        )}
                      </label>

                      {spec.inputType === 'select' ? (
                        <div className="relative">
                          <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white appearance-none pr-10 transition-colors hover:border-green-300"
                            value={formData.specs[spec.name] || ''}
                            onChange={(e) => handleSelectChange(e, spec.name)}
                            required
                          >
                            <option value="">Select {spec.label}</option>
                            {spec.options?.map((option: string) => (
                              <option key={option} value={option}>
                                {option
                                  .replace(/_/g, ' ')
                                  .toLowerCase()
                                  .replace(/^\w/, (c) => c.toUpperCase())}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      ) : spec.inputType === 'checkbox' ? (
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                id={`checkbox-${spec.name}`}
                                checked={formData.specs[spec.name] || false}
                                onChange={(e) =>
                                  handleCheckboxChange(e, spec.name)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-10 h-6 rounded-full transition-colors ${formData.specs[spec.name] ? 'bg-green-400 ' : 'bg-gray-200 '}`}
                              ></div>
                              <div
                                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${formData.specs[spec.name] ? 'translate-x-4 border-green-500 border-2' : ''}`}
                              ></div>
                            </div>
                            <span className="ml-3 select-none text-sm text-gray-700">
                              {spec.label}
                            </span>
                          </label>
                        </div>
                      ) : spec.inputType === 'color' ? (
                        <div className="flex gap-3 items-center">
                          <div className="relative">
                            <input
                              type="color"
                              value={formData.specs[spec.name] || '#000000'}
                              onChange={(e) =>
                                handleSpecChange(spec.name, e.target.value)
                              }
                              className="h-6 w-6 border-0 rounded-lg cursor-pointer"
                            />
                            <div className="absolute inset-0 rounded-lg border border-green-300 pointer-events-none"></div>
                          </div>
                          <input
                            type="text"
                            value={formData.specs[spec.name] || '#000000'}
                            onChange={(e) =>
                              handleSpecChange(spec.name, e.target.value)
                            }
                            disabled={true}
                            placeholder="#000000"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="flex items-center">
                            <input
                              required={true}
                              type={spec.inputType || 'text'}
                              value={formData.specs[spec.name] || ''}
                              onChange={(e) =>
                                handleSpecChange(spec.name, e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                              placeholder={`Enter ${spec.label.toLowerCase()}`}
                            />
                            {(spec.name.includes('Clock') ||
                              spec.name === 'capacity' ||
                              spec.name === 'wattage' ||
                              spec.name === 'speed') && (
                              <div className="absolute right-3 bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
                                {spec.name.includes('Clock') ||
                                spec.name === 'speed'
                                  ? spec.label.includes('GHz')
                                    ? 'GHz'
                                    : 'MHz'
                                  : spec.name === 'capacity'
                                    ? 'GB'
                                    : 'W'}
                              </div>
                            )}
                          </div>

                          {spec.name === 'socket' && (
                            <p className="mt-1 text-xs text-gray-500 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              e.g., AM4, LGA1200
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
