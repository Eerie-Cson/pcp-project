import { GET_CASES } from '../graphql/component/query/get-components.mutation';
import { Case, ComponentType } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { useComponentQuery } from './useComponentQuery';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { toPascalCase } from '../libs/toPascalCase';

export function useCasesQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.Case>
> {
  return useComponentQuery<Case, ComponentType.Case>(
    GET_CASES,
    'cases',
    (caseItem) => ({
      id: caseItem.id,
      name: caseItem.name,
      type: ComponentType.Case,
      price: Number(caseItem.price),
      partNumber: caseItem.partNumber,
      specs: {
        Manufacturer: caseItem.manufacturer,
        Interface: caseItem.interface,
        Type: toPascalCase(caseItem.type),
        FormFactor: caseItem.formFactor,
        PowerSupply: caseItem.powerSupply ? 'Included' : 'Not Included',
        Color: caseItem.color,
        SidePanel: toPascalCase(caseItem.sidePanel),
      },
      brand: caseItem.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
