import { Component } from './common';

export type PowerSupply = Component & {
  model: string;
  type: string;
  wattage: string;
  color: string;
  fanless: boolean;
  SATAConnectors: string;
  length: string;
};
