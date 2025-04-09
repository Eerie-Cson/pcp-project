import { ComponentType } from '../graphql-types/component';

export type PcComponent<CType extends ComponentType> = {
  id: string;
  type: CType;
  name: string;
  price: number;
  partNumber: string;
  brand: string;
  specs: {
    [key: string]: any;
  };
  stock?: number;
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
