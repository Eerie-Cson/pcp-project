import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { CREATE_MOTHERBOARD } from '../graphql/component/mutation/motherboard/create-motherboard.mutation';
import { ComponentType, Motherboard } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateComponent } from './useComponentMutation';

export function useCreateMotherboard() {
  const { createComponent, loading, error } =
    useCreateComponent<Motherboard>(CREATE_MOTHERBOARD);

  const handleAddMotherboard = async (
    component: PcComponent<ComponentType.Motherboard>,
  ) => {
    //TODO Create a transform library for this
    const variables: Motherboard = {
      id: ObjectId.generate(ObjectTypes.MOTHERBOARD).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      socket: component.specs.socket,
      formFactor: component.specs.formFactor,
      chipset: component.specs.chipset,
      memoryMax: component.specs.memoryMax,
      memoryType: component.specs.memoryType,
      memorySlots: component.specs.memorySlots,
      color: component.specs.color,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating case component:', err);
    }
  };

  return {
    handleAddMotherboard,
    loading,
    error,
  };
}
