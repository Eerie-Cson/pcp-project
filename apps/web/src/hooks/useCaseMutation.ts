import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { Case, ComponentType } from '../libs/graphql-types/component';
import { useCreateComponent } from './useComponentMutation';
import { PcComponent } from '../libs/types/components';
import { CREATE_CASE } from '../graphql/component/mutation/create-component.mutation';

export function useCreateCase() {
  const { createComponent, loading, error } =
    useCreateComponent<Case>(CREATE_CASE);

  const handleAddCase = async (component: PcComponent<ComponentType.Case>) => {
    //TODO Create a transform library for this
    const variables: Case = {
      id: ObjectId.generate(ObjectTypes.CASE).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,
      color: component.specs?.color,
      type: component.specs?.type,
      formFactor: component.specs?.formFactor,
      interface: component.specs?.interface,
      powerSupply: component.specs?.powerSupply,
      sidePanel: component.specs?.sidePanel,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating case component:', err);
    }
  };

  return {
    handleAddCase,
    loading,
    error,
  };
}
