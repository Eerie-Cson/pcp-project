import { GET_VIDEO_CARDS } from '../graphql/component/query/get-components.mutation';
import { ComponentType, VideoCard } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function useVideoCardsQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.VideoCard>
> {
  return useComponentQuery<VideoCard, ComponentType.VideoCard>(
    GET_VIDEO_CARDS,
    'videoCards',
    (videoCard) => ({
      id: videoCard.id,
      name: videoCard.name,
      type: ComponentType.VideoCard,
      price: Number(videoCard.price),
      partNumber: videoCard.partNumber,
      specs: {
        Manufacturer: videoCard.manufacturer,
        'Part Number': videoCard.partNumber,

        Model: videoCard.model,
        Chipset: videoCard.chipset,
        Memory: videoCard.memory,
        MemoryType: videoCard.memoryType,
        CoreClock: videoCard.coreClock,
        Interface: videoCard.interface,
        Color: videoCard.color,
        TDP: videoCard.TDP,
        CoolingFans: videoCard.coolingFans,
        DisplayPortOutputs: videoCard.displayPortOutputs,
        HDMIOutputs: videoCard.HDMIOutputs,
      },
      brand: videoCard.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
