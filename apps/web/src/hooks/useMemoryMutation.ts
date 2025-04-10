import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { ComponentType, Memory } from '../libs/graphql-types/component';
import { useCreateComponent } from './useComponentMutation';
import { PcComponent } from '../libs/types/components';
import { CREATE_MEMORY } from '../graphql/component/mutation/create-component.mutation';

export function useCreateMemory() {
  const { createComponent, loading, error } =
    useCreateComponent<Memory>(CREATE_MEMORY);

  const handleAddMemory = async (
    component: PcComponent<ComponentType.Memory>,
  ) => {
    //TODO Create a transform library for this
    const variables: Memory = {
      id: ObjectId.generate(ObjectTypes.MEMORY).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      speed: component.specs.speed,
      formFactor: component.specs.formFactor,
      modules: component.specs.modules,
      voltage: component.specs.voltage,
      heatSpreader: component.specs.heatSpreader,
      color: component.specs.color,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating case component:', err);
    }
  };

  return {
    handleAddMemory,
    loading,
    error,
  };
}
