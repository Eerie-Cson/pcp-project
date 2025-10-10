import React from 'react';
import { ComponentType } from '../../libs/graphql-types/component';
import { PcComponent } from '../../libs/types/components';
import { EmptyState } from '../common/EmptyState';
import ComponentCard from './ComponentCard';

interface ComponentGridProps {
  components: PcComponent<ComponentType>[];
  onResetFilters: () => void;
  onViewDetails: (component: PcComponent<ComponentType>) => void;
  onEdit: (component: PcComponent<ComponentType>) => void;
}

const ComponentGrid: React.FC<ComponentGridProps> = ({
  components,
  onResetFilters,
  onViewDetails,
  onEdit,
}) => {
  if (components.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((component) => (
        <ComponentCard
          key={component.id}
          component={component}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ComponentGrid;
