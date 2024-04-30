import { Component } from './common';

export enum StorageType {
  SSD = 'SSD',
  HDD = 'HDD',
}

export type Storage = Component & {
  capacity: string;
  type: StorageType;
  formFactor: string;
  interface: string;
  NVME: boolean;
};
