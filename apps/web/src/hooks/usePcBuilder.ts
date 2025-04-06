import { useState, useCallback } from 'react';
import { PcComponent, ComponentType } from '../libs/components';
import { allComponents, useCases } from '../libs/data';

export function usePcBuilder() {
  const [build, setBuild] = useState<PcComponent[]>([]);
  const [selectedType, setSelectedType] = useState<ComponentType>('CPU');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const { cases } = useCases();

  const allComponentsWithCase = allComponents.concat(cases);
  // Filter components based on selections
  const filteredComponents = allComponentsWithCase.filter(
    (comp) =>
      comp.type === selectedType &&
      comp.price >= priceRange[0] &&
      comp.price <= priceRange[1] &&
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Check for compatibility issues
  const checkCompatibility = useCallback((currentBuild: PcComponent[]) => {
    const issues: string[] = [];

    // Example checks
    const hasCPU = currentBuild.some((c) => c.type === 'CPU');
    const hasMB = currentBuild.some((c) => c.type === 'Motherboard');

    if (hasCPU && hasMB) {
      const cpu = currentBuild.find((c) => c.type === 'CPU')!;
      const mb = currentBuild.find((c) => c.type === 'Motherboard')!;

      if (!mb.compatibility.includes(cpu.specs['Socket'] as string)) {
        issues.push(
          `CPU socket (${cpu.specs['Socket']}) doesn't match motherboard (${mb.compatibility[0]})`,
        );
      }
    }

    setCompatibilityIssues(issues);
  }, []);

  // Add component to build
  const addToBuild = useCallback(
    (component: PcComponent) => {
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
