import React, { useState } from 'react';
import CreateComponentButton from './CreateComponentButton';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CASE } from '../../graphql/component/mutation/create-component.mutation';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import {
  Case,
  CaseType,
  ComponentType,
  SidePanelType,
} from '../../types/components/graphql';
import { GET_CASES } from '../../graphql/component/query/get-components.mutation';

type ComponentInput = {
  name: string;
  brand: string;
  price: string;
  partNumber: string;
  type: string;
  specs: Record<string, any>;
};
const ComponentListSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCase, { loading, error }] = useMutation(CREATE_CASE, {
    context: { service: 'components' },
    onCompleted: () => {
      alert('✅ Component created successfully!');
    },
  });

  const {
    data,
    loading: loadingData,
    error: errorData,
  } = useQuery(GET_CASES, {
    context: { service: 'components' },
  });

  if (loadingData) return <p>Loading users...</p>;
  if (errorData) return <p>Server is down: {errorData.message}</p>;

  const cases = data.getCases.map((item: Case) => ({
    id: item.id,
    type: item.componentType,
    name: item.name,
    brand: item.manufacturer,
    price: item.price,
    stock: 10,
    specs: {
      formFactor: item.formFactor,
      interface: item.interface,
      color: item.color,
      partNumber: item.partNumber,
      powerSupply: item.powerSupply,
      sidePanel: item.sidePanel,
    },
    imageUrl: '/api/placeholder/120/120',
  }));
  // Sample data - in a real app, this would come from props or an API
  const components = [
    {
      id: 1,
      type: 'CPU',
      name: 'Ryzen 7 5800X',
      brand: 'AMD',
      price: 299.99,
      stock: 15,
      specs: {
        cores: '8 cores / 16 threads',
        baseClock: '3.8 GHz',
        boostClock: '4.7 GHz',
        socket: 'AM4',
        tdp: '105W',
      },
      imageUrl: '/api/placeholder/120/120',
    },

    //...
  ].concat(cases);
  // const components: Record<string, any> = [];

  const componentTypes = [
    'All',
    'CPU',
    'GPU',
    'Motherboard',
    'RAM',
    'Storage',
    'PSU',
    'Case',
  ];

  // Filter components based on type and search query
  const filteredComponents = components.filter((component) => {
    const matchesType =
      activeFilter === 'All' || component.type === activeFilter;
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Sort components
  const sortedComponents = [...filteredComponents].sort(
    (a: Record<string, any>, b: Record<string, any>) => {
      let valueA, valueB;

      if (sortBy === 'price' || sortBy === 'stock') {
        valueA = a[sortBy];
        valueB = b[sortBy];
      } else {
        valueA = a[sortBy].toLowerCase();
        valueB = b[sortBy].toLowerCase();
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    },
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAddComponent = async (component: ComponentInput) => {
    const componentTypeMap: Record<string, any> = {
      CPU: ComponentType.Cpu,
      GPU: ComponentType.VideoCard,
      Motherboard: ComponentType.Motherboard,
      RAM: ComponentType.Memory,
      Storage: ComponentType.Storage,
      PSU: ComponentType.PowerSupply,
      Case: ComponentType.Case,
    };

    const componentTypeParams: string = component.type;
    console.log(componentTypeParams);

    const componentInput = {
      id: ObjectId.generate(ObjectTypes.CASE).toString(),
      name: component.name,
      price: component.price,
      manufacturer: component.brand,
      partNumber: component.partNumber,
      color: component.specs.color,
      componentType: componentTypeMap[componentTypeParams],
      formFactor: component.specs.formFactor,
      interface: component.specs.interface,
      powerSupply: true,
      type: CaseType.AtxMidTower,
      sidePanel: SidePanelType.TemperedGlass,
    };
    console.log(componentInput);
    try {
      await createCase({
        variables: componentInput,
      });
    } catch (error) {
      console.error('Error creating component:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto border-t-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold">Components Inventory</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-2 sm:mt-0 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-blue-500 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add New Component
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {componentTypes.map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeFilter === type
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => setActiveFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 mb-4 text-sm text-gray-600">
        <span>Sort by:</span>
        <button
          className={`hover:text-gray-900 ${sortBy === 'name' ? 'font-semibold text-green-600' : ''}`}
          onClick={() => handleSort('name')}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <span>|</span>
        <button
          className={`hover:text-gray-900 ${sortBy === 'price' ? 'font-semibold text-green-600' : ''}`}
          onClick={() => handleSort('price')}
        >
          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <span>|</span>
        <button
          className={`hover:text-gray-900 ${sortBy === 'stock' ? 'font-semibold text-green-600' : ''}`}
          onClick={() => handleSort('stock')}
        >
          Stock {sortBy === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Components List */}
      {sortedComponents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedComponents.map((component) => (
            <div
              key={component.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
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
                      <p className="font-semibold text-green-600">
                        ${component.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {component.stock}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.entries(component.specs)
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
          ))}
        </div>
      ) : (
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
            onClick={() => {
              setActiveFilter('All');
              setSearchQuery('');
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {sortedComponents.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {sortedComponents.length} of {components.length} components
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm font-medium">
              1
            </button>
            <button
              className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      )}
      <CreateComponentButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComponent}
      />
    </div>
  );
};

export default ComponentListSection;
