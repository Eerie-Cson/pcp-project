import { Common } from './common';
export declare enum MemoryType {
    DDR3 = "DDR3",
    DDR4 = "DDR4",
    DDR5 = "DDR5"
}
export type Motherboard = Common & {
    socket: string;
    formFactor: string;
    chipset: string;
    memoryMax: string;
    memoryType: MemoryType;
    memorySlots: string;
    color: string;
};
