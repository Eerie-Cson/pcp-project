import { useQuery } from '@apollo/client';
import { PcComponent, ComponentType } from '../libs/components';
import {
  Case,
  ComponentType as ComponentTypeGql,
} from '../types/components/graphql';
import { GET_CASES } from '../graphql/component/query/get-components.mutation';

export const COMPONENT_TYPES: ComponentType[] = [
  'CPU',
  'GPU',
  'Motherboard',
  'RAM',
  'Storage',
  'PSU',
  'Case',
  'Cooling',
];

export function useCases() {
  const { data, loading, error } = useQuery<{ getCases: Case[] }>(GET_CASES, {
    context: { service: 'components' },
  });

  const transformCase = (caseItem: Case): PcComponent => ({
    id: caseItem.id,
    name: caseItem.name,
    type: 'Case',
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
  });

  return {
    loading,
    error,
    cases: data?.getCases?.map(transformCase) || [],
  };
}

export const allComponents: PcComponent[] = [
  {
    id: 'cpu-1',
    name: 'AMD Ryzen 9 7950X',
    type: 'CPU',
    price: 699,
    specs: {
      'Cores/Threads': '16/32',
      'Base Clock': '4.5GHz',
      'Boost Clock': '5.7GHz',
      Socket: 'AM5',
      TDP: '170W',
      Cache: '80MB',
    },
    brand: 'AMD',
    image: 'https://example.com/cpu-amd.jpg',
    compatibility: ['AM5'],
    rating: 4.9,
    features: ['Zen 4 Architecture', 'PCIe 5.0 Support', 'DDR5 Memory Support'],
  },
  // Add 10+ more components with similar detail
];

export const FEATURED_BRANDS = [
  'AMD',
  'Intel',
  'NVIDIA',
  'Corsair',
  'ASUS',
  'MSI',
  'Samsung',
  'Seagate',
];
