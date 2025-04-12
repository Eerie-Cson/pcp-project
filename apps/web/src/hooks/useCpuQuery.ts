import { GET_CPUS } from '../graphql/component/query/cpu/cpus.query';
import { ComponentType, Cpu } from '../libs/graphql-types/component';
import { toPascalCase } from '../libs/toPascalCase';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function useCpusQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.Cpu>
> {
  return useComponentQuery<Cpu, ComponentType.Cpu>(
    GET_CPUS,
    'CPUs',
    (cpuItem) => ({
      id: cpuItem.id,
      name: cpuItem.name,
      type: ComponentType.Cpu,
      price: Number(cpuItem.price),
      partNumber: cpuItem.partNumber,
      specs: {
        Series: cpuItem.series,
        MicroArchitecture: cpuItem.microarchitecture,
        CoreFamily: cpuItem.coreFamily,
        Socket: cpuItem.socket,
        Cores: cpuItem.coreCount,
        CoreClock: cpuItem.coreClock,
        TDP: cpuItem.tdp,
        IntegratedGraphics: cpuItem.integratedGraphics,
        Cooler: cpuItem.cooler ? 'Included' : 'Not Included',
        Packaging: toPascalCase(cpuItem.packaging),
        Manufacturer: cpuItem.manufacturer,
      },
      brand: cpuItem.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
