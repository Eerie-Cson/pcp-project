import { GET_MEMORYS } from '../graphql/component/query/cases/cases.query';
import { ComponentType, Memory } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function useMemorysQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.Memory>
> {
  return useComponentQuery<Memory, ComponentType.Memory>(
    GET_MEMORYS,
    'memorys',
    (memory) => ({
      id: memory.id,
      name: memory.name,
      type: ComponentType.Memory,
      price: Number(memory.price),
      partNumber: memory.partNumber,
      specs: {
        Manufacturer: memory.manufacturer,

        Speed: memory.speed,
        'Form Factor': memory.formFactor,
        Modules: memory.modules,
        Voltage: memory.voltage,
        'Heat Spreader': memory.heatSpreader,
        Color: memory.color,
      },
      brand: memory.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
