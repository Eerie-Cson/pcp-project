import { Component } from './common';

export type Memory = Component & {
  speed: string;
  formFactor: string;
  modules: string;
  voltage: string;
  heatSpreader: boolean;
  color: string;
};
