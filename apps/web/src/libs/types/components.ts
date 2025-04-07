// export type ComponentType =
//   | 'CPU'
//   | 'GPU'
//   | 'Motherboard'
//   | 'RAM'
//   | 'Storage'
//   | 'PSU'
//   | 'Case'
//   | 'Cooling';

import { ComponentType } from '../graphql-types/component';

export type PcComponent<CType extends ComponentType> = {
  id: string;
  name: string;
  type: CType;
  stock?: number;
  price: number;
  specs: Record<string, string | number>;
  brand: string;
  image: string;
  compatibility: string[];
  rating?: number;
  imageUrl?: string;
  features?: string[];
};

export const COMPONENT_TYPES_MAP = {
  [ComponentType.Cpu]: 'CPU',
  [ComponentType.Case]: 'Case',
  [ComponentType.Memory]: 'Memory',
  [ComponentType.Motherboard]: 'Motherboard',
  [ComponentType.PowerSupply]: 'Power Supply',
  [ComponentType.Storage]: 'Storage',
  [ComponentType.VideoCard]: 'Video Card',
};
