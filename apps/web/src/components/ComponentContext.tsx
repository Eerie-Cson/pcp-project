// components/ComponentContext.tsx
import React, { createContext, useState } from 'react';
import { PcComponent } from '../libs/components';

const ComponentContext = createContext<{
  selectedComponent: PcComponent | null;
  setSelectedComponent: (selectedComponent: PcComponent | null) => void;
}>({ selectedComponent: null, setSelectedComponent: () => {} });

const ComponentProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent | null>(null);

  return (
    <ComponentContext.Provider
      value={{ selectedComponent, setSelectedComponent }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export { ComponentProvider, ComponentContext };
