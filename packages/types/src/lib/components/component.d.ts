import { Case } from './case';
import { Cpu } from './cpu';
import { Memory } from './memory';
import { Motherboard } from './motherboard';
import { PowerSupply } from './power-supply';
import { Storage } from './storage';
import { VideoCard } from './video-card';
export declare enum ComponentType {
    CPU = "CPU",
    CASE = "CASE",
    MOTHERBOARD = "MOTHERBOARD",
    MEMORY = "MEMORY",
    STORAGE = "STORAGE",
    VIDEO_CARD = "VIDEO_CARD",
    POWER_SUPPLY = "POWER_SUPPLY"
}
export type Component = (Case & {
    componentType: ComponentType.CASE;
}) | (Cpu & {
    componentType: ComponentType.CPU;
}) | (Memory & {
    componentType: ComponentType.MEMORY;
}) | (Motherboard & {
    componentType: ComponentType.MOTHERBOARD;
}) | (PowerSupply & {
    componentType: ComponentType.POWER_SUPPLY;
}) | (Storage & {
    componentType: ComponentType.STORAGE;
}) | (VideoCard & {
    componentType: ComponentType.VIDEO_CARD;
});
