import { Node } from '../node';
export type Common = Node & {
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
};
