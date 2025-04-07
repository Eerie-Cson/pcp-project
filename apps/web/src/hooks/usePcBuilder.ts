import { useState, useCallback } from 'react';
import { PcComponent } from '../libs/types/components';
import { ComponentType } from '../libs/graphql-types/component';
import { useCasesQuery } from './useCasesQuery';

export function usePcBuilder() {
  const [build, setBuild] = useState<PcComponent<ComponentType>[]>([]);
  const [selectedType, setSelectedType] = useState<ComponentType>(
    ComponentType.Case,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent<ComponentType> | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const { data: caseData } = useCasesQuery();

  const components: PcComponent<ComponentType>[] = caseData;

  // Filter components based on selections
  const filteredComponents = components.filter(
    (comp) =>
      comp.type === selectedType &&
      comp.price >= priceRange[0] &&
      comp.price <= priceRange[1] &&
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    build,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedComponent,
    setSelectedComponent,
    compatibilityIssues,
    filteredComponents,
    addToBuild,
    removeFromBuild,
    clearBuild,
    totalPrice,
  };
}
