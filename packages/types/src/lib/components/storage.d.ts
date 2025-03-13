import { Common } from './common';
export declare enum StorageType {
    SSD = "SSD",
    HDD = "HDD"
}
export type Storage = Common & {
    capacity: string;
    type: StorageType;
    formFactor: string;
    interface: string;
    NVME: boolean;
};
