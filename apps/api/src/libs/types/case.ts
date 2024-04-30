import { Component } from './common';

export enum CaseType {
  ATX = 'ATX',
  EATX = 'EATX',
  MicroATX = 'MicroATX',
  MiniITX = 'MiniITX',
  ATX_MID_TOWER = 'ATX_MID_TOWER',
}

export enum SidePanelType {
  TEMPERED_GLASS = 'TEMPERED_GLASS',
  TINTED_TEMPERED_GLASS = 'TINTED_TEMPERED_GLASS',
}

export type Case = Component & {
  color: string;
  type: CaseType;
  formFactor: string;
  interface: string;
  powerSupply: boolean;
  sidePanel: SidePanelType;
};
