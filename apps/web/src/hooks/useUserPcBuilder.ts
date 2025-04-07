import { useState, useCallback } from 'react';
import { PcComponent } from '../libs/types/components';
import { ComponentType } from '../libs/graphql-types/component';
import { useCasesQuery } from './useCasesQuery';
import enumToArray from '../libs/enumToArray';

export function useUserPcBuilder() {
  const [build, setBuild] = useState<PcComponent<ComponentType>[]>([]);

  const [activeFilter, setActiveFilter] = useState<ComponentType>(
    'All' as ComponentType,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent<ComponentType> | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 3;

  const { data: caseData } = useCasesQuery();

  const components: PcComponent<ComponentType>[] = caseData || [];

  const componentTypes = [
    'All' as ComponentType,
    ...enumToArray<ComponentType>(ComponentType),
  ];

  const filteredComponents = components.filter((component) => {
    const matchesType =
      activeFilter === ('All' as ComponentType) ||
      component.type === activeFilter;
    const matchesSearch =
      component.price >= priceRange[0] &&
      component.price <= priceRange[1] &&
      component.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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

  // Check for compatibility issues
  const checkCompatibility = useCallback(
    (currentBuild: PcComponent<ComponentType>[]) => {
      const issues: string[] = [];

      // Example checks
      const hasCPU = currentBuild.some((c) => c.type === ComponentType.Cpu);
      const hasMB = currentBuild.some(
        (c) => c.type === ComponentType.Motherboard,
      );

      if (hasCPU && hasMB) {
        const cpu = currentBuild.find((c) => c.type === ComponentType.Cpu)!;
        const mb = currentBuild.find(
          (c) => c.type === ComponentType.Motherboard,
        )!;

        if (!mb.compatibility.includes(cpu.specs['Socket'] as string)) {
          issues.push(
            `CPU socket (${cpu.specs['Socket']}) doesn't match motherboard (${mb.compatibility[0]})`,
          );
        }
      }

      setCompatibilityIssues(issues);
    },
    [],
  );

  // Add component to build
  const addToBuild = useCallback(
    (component: PcComponent<ComponentType>) => {
      if (!build.some((item) => item.id === component.id)) {
        const newBuild = [...build, component];
        setBuild(newBuild);
        checkCompatibility(newBuild);
      }
    },
    [build, checkCompatibility],
  );

  // Remove component from build
  const removeFromBuild = useCallback(
    (id: string) => {
      const newBuild = build.filter((item) => item.id !== id);
      setBuild(newBuild);
      checkCompatibility(newBuild);
    },
    [build, checkCompatibility],
  );

  // Clear all components from build
  const clearBuild = useCallback(() => {
    setBuild([]);
    setCompatibilityIssues([]);
  }, []);

  // Calculate total price
  const totalPrice = build.reduce((sum, item) => sum + item.price, 0);

  return {
    // State
    activeFilter,
    searchQuery,
    sortOrder,
    sortBy,
    selectedComponent,
    currentPage,
    compatibilityIssues,

    // Data
    build,
    priceRange,
    filteredComponents,
    totalPrice,
    sortedComponents,
    paginatedComponents,
    componentTypes,

    // Actions
    removeFromBuild,
    addToBuild,
    setPriceRange,
    setSelectedComponent,
    clearBuild,
    setSearchQuery,
    setCurrentPage,
    handleSort,
    resetFilters,
    setActiveFilter,
  };
}
