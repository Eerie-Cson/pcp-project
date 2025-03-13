import { Common } from './common';
export type PowerSupply = Common & {
    model: string;
    type: string;
    wattage: string;
    color: string;
    fanless: boolean;
    SATAConnectors: string;
    length: string;
};
