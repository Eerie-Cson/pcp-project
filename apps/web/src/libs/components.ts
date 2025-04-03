export type ComponentType =
  | 'CPU'
  | 'GPU'
  | 'Motherboard'
  | 'RAM'
  | 'Storage'
  | 'PSU'
  | 'Case'
  | 'Cooling';

export interface PcComponent {
  id: string;
  name: string;
  type: ComponentType;
  price: number;
  specs: Record<string, string | number>;
  brand: string;
  image: string;
  compatibility: string[];
  rating?: number;
  features?: string[];
}
