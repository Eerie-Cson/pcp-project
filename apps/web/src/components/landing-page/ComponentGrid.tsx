import React from 'react';
import { PcComponent } from '../../libs/components';
import { ComponentCard } from './ComponentCard';

interface ComponentGridProps {
  components: PcComponent[];
  onAddToBuild: (component: PcComponent) => void;
  onSelectComponent: (component: PcComponent) => void;
}

export function ComponentGrid({
  components,
  onAddToBuild,
  onSelectComponent,
}: ComponentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
          onAddToBuild={onAddToBuild}
          onSelect={onSelectComponent}
        />
      ))}
    </div>
  );
}
