import { Common } from './common';

export enum CaseType {
  ATX = 'ATX',
  EATX = 'EATX',
  MICRO_ATX = 'MICRO_ATX',
  MINI_ITX = 'MINI_ITX',
  ATX_MID_TOWER = 'ATX_MID_TOWER',
}

export enum SidePanelType {
  TEMPERED_GLASS = 'TEMPERED_GLASS',
  TINTED_TEMPERED_GLASS = 'TINTED_TEMPERED_GLASS',
}

export type Case = Common & {
  color: string;
  type: CaseType;
  formFactor: string;
  interface: string;
  powerSupply: boolean;
  sidePanel: SidePanelType;
};
