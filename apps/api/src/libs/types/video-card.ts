import { Component } from './common';

export type VideoCard = Component & {
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
