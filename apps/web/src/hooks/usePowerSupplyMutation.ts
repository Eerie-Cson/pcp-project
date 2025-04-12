import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { CREATE_POWER_SUPPLY } from '../graphql/component/mutation/power-supply/create-power-supply.mutation';
import { ComponentType, PowerSupply } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateComponent } from './useComponentMutation';

export function useCreatePowerSupply() {
  const { createComponent, loading, error } =
    useCreateComponent<PowerSupply>(CREATE_POWER_SUPPLY);

  const handleAddPowerSupply = async (
    component: PcComponent<ComponentType.PowerSupply>,
  ) => {
    //TODO Create a transform library for this
    const variables: PowerSupply = {
      id: ObjectId.generate(ObjectTypes.POWER_SUPPLY).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      model: component.specs.model,
      type: component.specs.type,
      wattage: component.specs.wattage,
      color: component.specs.color,
      fanless: component.specs.fanless,
      SATAConnectors: component.specs.SATAConnectors,
      length: component.specs.length,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating power supply component:', err);
    }
  };

  return {
    handleAddPowerSupply,
    loading,
    error,
  };
}
