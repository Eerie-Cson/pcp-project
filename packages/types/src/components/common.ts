import { Node } from '../node';

export type Component = Node & {
  name: string;
  price: string;
  manufacturer: string;
  partNumber: string;
};
