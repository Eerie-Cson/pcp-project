import { Case } from './case';
import { Cpu } from './cpu';
import { Memory } from './memory';
import { Motherboard } from './motherboard';
import { PowerSupply } from './power-supply';
import { Storage } from './storage';
import { VideoCard } from './video-card';

export enum ComponentType {
  CPU = 'CPU',
  CASE = 'CASE',
  MOTHERBOARD = 'MOTHERBOARD',
  MEMORY = 'MEMORY',
  STORAGE = 'STORAGE',
  VIDEO_CARD = 'VIDEO_CARD',
  POWER_SUPPLY = 'POWER_SUPPLY',
}

export type Component = { componentType: ComponentType } & (
  | Case
  | Cpu
  | Memory
  | Motherboard
  | PowerSupply
  | Storage
  | VideoCard
);
