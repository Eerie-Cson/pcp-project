import React from 'react';
import { PcComponent } from '../../libs/types/components';
import { ComponentType } from '../../libs/graphql-types/component';
import ComponentCard from './ComponentCard';
import { EmptyState } from '../common/EmptyState';

interface ComponentGridProps {
  components: PcComponent<ComponentType>[];
  onResetFilters: () => void;
}

const ComponentGrid: React.FC<ComponentGridProps> = ({
  components,
  onResetFilters,
}) => {
  if (components.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
};

export default ComponentGrid;
