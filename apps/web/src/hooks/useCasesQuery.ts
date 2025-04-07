import { GET_CASES } from '../graphql/component/query/get-components.mutation';
import { Case, ComponentType } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import {
  useComponentQuery,
  UseComponentQueryReturn,
} from './useComponentQuery';

export function useCasesQuery(): UseComponentQueryReturn<
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
      specs: {
        Manufacturer: caseItem.manufacturer,
        PartNumber: caseItem.partNumber,
        Color: caseItem.color,
        Type: caseItem.type,
        FormFactor: caseItem.formFactor,
        Interface: caseItem.interface,
        PowerSupply: caseItem.powerSupply ? 'Included' : 'Not Included',
        SidePanel: caseItem.sidePanel,
      },
      brand: caseItem.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}
