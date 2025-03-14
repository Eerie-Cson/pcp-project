import { Common } from './common';

export type Memory = Common & {
  speed: string;
  formFactor: string;
  modules: string;
  voltage: string;
  heatSpreader: boolean;
  color: string;
};
