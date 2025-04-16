import { useState } from 'react';

import { useCasesQuery } from '../hooks/useCasesQuery';
import enumToArray from '../libs/enumToArray';
import { ComponentType } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateCase } from './useCaseMutation';
import { useCreateCPU } from './useCpuMutation';
import { useCpusQuery } from './useCpuQuery';
import { useCreateMemory } from './useMemoryMutation';
import { useMemorysQuery } from './useMemoryQuery';
import { useCreateMotherboard } from './useMotherboardMutation';
import { useMotherboardsQuery } from './useMotherboardQuery';
import { useCreatePowerSupply } from './usePowerSupplyMutation';
import { usePowerSuppliesQuery } from './usePowerSupplyQuery';
import { useCreateStorage } from './useStorageMutation';
import { useStoragesQuery } from './useStorageQuery';
import { useCreateVideoCard } from './useVideoCardMutation';
import { useVideoCardsQuery } from './useVideoCardQuery';

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

  const { data: caseData } = useCasesQuery();
  const { data: cpuData } = useCpusQuery();
  const { data: memoryData } = useMemorysQuery();
  const { data: videoCardData } = useVideoCardsQuery();
  const { data: motherboardData } = useMotherboardsQuery();
  const { data: powerSupplyData } = usePowerSuppliesQuery();
  const { data: storageData } = useStoragesQuery();

  const components: PcComponent<ComponentType>[] = [
    ...(motherboardData || []),
    ...(caseData || []),
    ...(cpuData || []),
    ...(storageData || []),
    ...(memoryData || []),
    ...(videoCardData || []),
    ...(powerSupplyData || []),
  ];

  //TODO: Move this to a separate hook and add a mapper
  const { handleAddCase } = useCreateCase();
  const { handleAddCPU } = useCreateCPU();
  const { handleAddMemory } = useCreateMemory();
  const { handleAddVideoCard } = useCreateVideoCard();
  const { handleAddMotherboard } = useCreateMotherboard();
  const { handleAddPowerSupply } = useCreatePowerSupply();
  const { handleAddStorage } = useCreateStorage();

  const handleAddComponent = async (component: any) => {
    if (component.type === ComponentType.Case) {
      await handleAddCase(component);
    }
    if (component.type === ComponentType.Cpu) {
      await handleAddCPU(component);
    }
    if (component.type === ComponentType.Memory) {
      await handleAddMemory(component);
    }
    if (component.type === ComponentType.VideoCard) {
      await handleAddVideoCard(component);
    }
    if (component.type === ComponentType.Motherboard) {
      await handleAddMotherboard(component);
    }
    if (component.type === ComponentType.PowerSupply) {
      await handleAddPowerSupply(component);
    }
    if (component.type === ComponentType.Storage) {
      await handleAddStorage(component);
    }
  };

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
    itemsPerPage,

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
    // handleFunction,
  };
};
