import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { CREATE_VIDEO_CARD } from '../graphql/component/mutation/case/create-case.mutation';
import { ComponentType, VideoCard } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useCreateComponent } from './useComponentMutation';

export function useCreateVideoCard() {
  const { createComponent, loading, error } =
    useCreateComponent<VideoCard>(CREATE_VIDEO_CARD);

  const handleAddVideoCard = async (
    component: PcComponent<ComponentType.VideoCard>,
  ) => {
    //TODO Create a transform library for this
    const variables: VideoCard = {
      id: ObjectId.generate(ObjectTypes.VIDEO_CARD).toString(),
      name: component.name,
      componentType: component.type,
      price: component.price.toString(),
      manufacturer: component.brand,
      partNumber: component.partNumber,

      model: component.specs.model,
      chipset: component.specs.chipset,
      memory: component.specs.memory,
      memoryType: component.specs.memoryType,
      coreClock: component.specs.coreClock,
      interface: component.specs.interface,
      color: component.specs.color,
      TDP: component.specs.TDP,
      coolingFans: component.specs.coolingFans,
      displayPortOutputs: component.specs.displayPortOutputs,
      HDMIOutputs: component.specs.HDMIOutputs,
    };

    try {
      await createComponent(variables);
    } catch (err) {
      alert(`Error Creating Video Card component: ${err}`);
    }
  };

  return {
    handleAddVideoCard,
    loading,
    error,
  };
}
