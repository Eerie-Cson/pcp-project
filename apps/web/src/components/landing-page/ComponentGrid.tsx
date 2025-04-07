import { PcComponent } from '../../libs/types/components';
import { ComponentCard } from './ComponentCard';
import { ComponentType } from '../../libs/graphql-types/component';

interface ComponentGridProps {
  components: PcComponent<ComponentType>[];
  onAddToBuild: (component: PcComponent<ComponentType>) => void;
  onSelectComponent: (component: PcComponent<ComponentType>) => void;
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
