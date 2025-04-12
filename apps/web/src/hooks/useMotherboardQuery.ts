import { GET_MOTHERBOARDS } from '../graphql/component/query/motherboard/motherboards.query';
import { ComponentType, Motherboard } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function useMotherboardsQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.Motherboard>
> {
  return useComponentQuery<Motherboard, ComponentType.Motherboard>(
    GET_MOTHERBOARDS,
    'motherboards',
    (motherboard) => ({
      id: motherboard.id,
      name: motherboard.name,
      type: ComponentType.Motherboard,
      price: Number(motherboard.price),
      partNumber: motherboard.partNumber,
      specs: {
        Manufacturer: motherboard.manufacturer,

        Socket: motherboard.socket,
        'Form Factor': motherboard.formFactor,
        Chipset: motherboard.chipset,
        'Memory Max': motherboard.memoryMax,
        'Memory Type': motherboard.memoryType,
        'Memory Slots': motherboard.memorySlots,
        Color: motherboard.color,
      },
      brand: motherboard.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
