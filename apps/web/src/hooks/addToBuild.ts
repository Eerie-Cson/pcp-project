import { useState } from 'react';
import { ComponentType, PcComponent } from '../libs/components';
import allComponents from '../libs/data';

export default function buildUtils() {
  const [build, setBuild] = useState<PcComponent[]>([]);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedType, setSelectedType] = useState<ComponentType>('CPU');
  const [searchQuery, setSearchQuery] = useState('');

  const addToBuild = (component: PcComponent) => {
    if (!build.some((item) => item.id === component.id)) {
      const newBuild = [...build, component];
      setBuild(newBuild);
      checkCompatibility(newBuild);
    }
  };

  const filteredComponents = allComponents.filter(
    (comp) =>
      comp.type === selectedType &&
      comp.price >= priceRange[0] &&
      comp.price <= priceRange[1] &&
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const removeFromBuild = (id: string) => {
    const newBuild = build.filter((item) => item.id !== id);
    setBuild(newBuild);
    checkCompatibility(newBuild);
  };

  const checkCompatibility = (currentBuild: PcComponent[]) => {
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
  };
  const totalPrice = build.reduce((sum, item) => sum + item.price, 0);

  return {
    addToBuild,
    removeFromBuild,
    build,
    compatibilityIssues,
    totalPrice,
    priceRange,
    filteredComponents,

    setPriceRange,
    setSelectedType,
    setSearchQuery,
  };
}
