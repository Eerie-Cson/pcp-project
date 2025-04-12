import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { CREATE_CPU } from '../graphql/component/mutation/cpu/create-cpu.mutation';
import { ComponentType, Cpu } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateComponent } from './useComponentMutation';

export function useCreateCPU() {
  const { createComponent, loading, error } =
    useCreateComponent<Cpu>(CREATE_CPU);

  const handleAddCPU = async (component: PcComponent<ComponentType.Cpu>) => {
    //TODO Create a transform library for this
    const variables: Cpu = {
      id: ObjectId.generate(ObjectTypes.CASE).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      series: component.specs.series,
      microarchitecture: component.specs.microarchitecture,
      coreFamily: component.specs.coreFamily,
      socket: component.specs.socket,
      coreCount: component.specs.cores,
      coreClock: component.specs.coreClock,
      tdp: component.specs.tdp,
      integratedGraphics: component.specs.integratedGraphics,
      cooler: component.specs.cooler,
      packaging: component.specs.packaging,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      console.error('Error creating case component:', err);
    }
  };

  return {
    handleAddCPU,
    loading,
    error,
  };
}
