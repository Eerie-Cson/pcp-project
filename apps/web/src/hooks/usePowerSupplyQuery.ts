import { GET_POWER_SUPPLIES } from '../graphql/component/query/power-supply/power-supplies.query';
import { ComponentType, PowerSupply } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function usePowerSuppliesQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.PowerSupply>
> {
  return useComponentQuery<PowerSupply, ComponentType.PowerSupply>(
    GET_POWER_SUPPLIES,
    'powerSupplies',
    (powerSupply) => ({
      id: powerSupply.id,
      name: powerSupply.name,
      type: ComponentType.PowerSupply,
      price: Number(powerSupply.price),
      partNumber: powerSupply.partNumber,
      specs: {
        Manufacturer: powerSupply.manufacturer,

        Model: powerSupply.model,
        Type: powerSupply.type,
        Wattage: powerSupply.wattage,
        Color: powerSupply.color,
        Fanless: powerSupply.fanless ? 'Included' : 'Not Included',
        SATAConnectors: powerSupply.SATAConnectors,
        Length: powerSupply.length,
      },
      brand: powerSupply.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
