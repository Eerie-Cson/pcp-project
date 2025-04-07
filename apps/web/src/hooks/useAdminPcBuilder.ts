import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CASE } from '../graphql/component/mutation/create-component.mutation';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import {
  Case,
  CaseType,
  ComponentType,
  SidePanelType,
} from '../libs/graphql-types/component';
import { useCasesQuery } from '../hooks/useCasesQuery';
import { PcComponent } from '../libs/types/components';
import enumToArray from '../libs/enumToArray';

type ComponentInput = {
  name: string;
  brand: string;
  price: string;
  partNumber: string;
  type: string;
  specs: Record<string, any>;
};

export const useAdminPcBuilder = () => {
  const [activeFilter, setActiveFilter] = useState<ComponentType>(
    'All' as ComponentType,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6;

  const [createCase] = useMutation<Case>(CREATE_CASE, {
    context: { service: 'components' },
    onCompleted: () => {
      alert('✅ Component created successfully!');
      window.location.reload();
    },
  });

  const { data: caseData } = useCasesQuery();
  const components: PcComponent<ComponentType>[] = caseData || [];

  const componentTypes = [
    'All' as ComponentType,
    ...enumToArray<ComponentType>(ComponentType),
  ];

  // Filter components based on type and search query
  const filteredComponents = components.filter((component) => {
    const matchesType =
      activeFilter === ('All' as ComponentType) ||
      component.type === activeFilter;
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
        valueA = a[sortBy]?.toLowerCase?.() || '';
        valueB = b[sortBy]?.toLowerCase?.() || '';
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    },
  );

  // Paginate components
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComponents = sortedComponents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setActiveFilter('All' as ComponentType);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleAddComponent = async (component: ComponentInput) => {
    const componentInput = {
      id: ObjectId.generate(ObjectTypes.CASE).toString(),
      name: component.name,
      price: component.price,
      manufacturer: component.brand,
      partNumber: component.partNumber,
      color: component.specs.color,
      componentType: ComponentType.Case,
      formFactor: component.specs.formFactor,
      interface: component.specs.interface,
      powerSupply: true,
      type: CaseType.AtxMidTower,
      sidePanel: SidePanelType.TemperedGlass,
    };

    try {
      await createCase({
        variables: componentInput,
      });
    } catch (error) {
      console.error('Error creating component:', error);
      // Handle error state here if needed
    }
  };

  return {
    // State
    activeFilter,
    searchQuery,
    sortBy,
    sortOrder,
    isModalOpen,
    currentPage,

    // Data
    components,
    componentTypes,
    filteredComponents,
    sortedComponents,
    paginatedComponents,

    // Actions
    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setIsModalOpen,
    setCurrentPage,
    handleSort,
    resetFilters,
    handleAddComponent,
  };
};
