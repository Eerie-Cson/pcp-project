import { Common } from './common';

export enum PackagingType {
  BOXED = 'BOXED',
}

export type Cpu = Common & {
  socket: string;
  series: string;
  microarchitecture: string;
  coreFamily: string;
  coreCount: string;
  coreClock: string;
  tdp: string;
  integratedGraphics: string;
  cooler: boolean;
  packaging: PackagingType;
};
