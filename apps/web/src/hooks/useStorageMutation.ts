import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { CREATE_STORAGE } from '../graphql/component/mutation/storage/create-storage.mutation';
import { ComponentType, Storage } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateComponent } from './useComponentMutation';

export function useCreateStorage() {
  const { createComponent, loading, error } =
    useCreateComponent<Storage>(CREATE_STORAGE);

  const handleAddStorage = async (
    component: PcComponent<ComponentType.Storage>,
  ) => {
    //TODO Create a transform library for this
    const variables: Storage = {
      id: ObjectId.generate(ObjectTypes.STORAGE).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      capacity: component.specs.capacity,
      formFactor: component.specs.formFactor,
      type: component.specs.type,
      interface: component.specs.interface,
      NVME: component.specs.NVME,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating case component:', err);
    }
  };

  return {
    handleAddStorage,
    loading,
    error,
  };
}
