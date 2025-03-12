import { Common } from './common';

export type VideoCard = Common & {
  model: string;
  chipset: string;
  memory: string;
  memoryType: string;
  coreClock: string;
  interface: string;
  color: string;
  TDP: string;
  coolingFans: string;
  displayPortOutputs: string;
  HDMIOutputs: string;
};
