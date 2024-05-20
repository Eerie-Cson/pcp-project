
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { ObjectId as _ObjectId } from '@pcp/object-id'

export enum CaseType {
    ATX_MID_TOWER = "ATX_MID_TOWER"
}

export enum SidePanelType {
    TEMPERED_GLASS = "TEMPERED_GLASS",
    TINTED_TEMPERED_GLASS = "TINTED_TEMPERED_GLASS"
}

export enum PackagingType {
    BOXED = "BOXED"
}

export enum MemoryType {
    DDR4 = "DDR4",
    DDR5 = "DDR5"
}

export enum StorageType {
    SSD = "SSD",
    HDD = "HDD"
}

export interface CreateCaseInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    color: string;
    type: CaseType;
    formFactor: string;
    interface: string;
    powerSupply: boolean;
    sidePanel: SidePanelType;
}

export interface UpdateCaseInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    color?: Nullable<string>;
    type?: Nullable<CaseType>;
    formFactor?: Nullable<string>;
    interface?: Nullable<string>;
    powerSupply?: Nullable<boolean>;
    sidePanel?: Nullable<SidePanelType>;
}

export interface CreateCPUInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    series: string;
    microarchitecture: string;
    coreFamily: string;
    socket: string;
    coreCount: string;
    coreClock: string;
    tdp: string;
    integratedGraphics: string;
    cooler: boolean;
    packaging: PackagingType;
}

export interface UpdateCPUInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    series?: Nullable<string>;
    microarchitecture?: Nullable<string>;
    coreFamily?: Nullable<string>;
    socket?: Nullable<string>;
    coreCount?: Nullable<string>;
    coreClock?: Nullable<string>;
    tdp?: Nullable<string>;
    integratedGraphics?: Nullable<string>;
    cooler?: Nullable<boolean>;
    packaging?: Nullable<PackagingType>;
}

export interface CreateMemoryInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    speed: string;
    formFactor: string;
    modules: string;
    voltage: string;
    heatSpreader: boolean;
    color: string;
}

export interface UpdateMemoryInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    speed?: Nullable<string>;
    formFactor?: Nullable<string>;
    modules?: Nullable<string>;
    voltage?: Nullable<string>;
    heatSpreader?: Nullable<boolean>;
    color?: Nullable<string>;
}

export interface CreateMotherboardInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    socket: string;
    formFactor: string;
    chipset: string;
    memoryMax: string;
    memoryType: MemoryType;
    memorySlots: string;
    color: string;
}

export interface UpdateMotherboardInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    socket?: Nullable<string>;
    formFactor?: Nullable<string>;
    chipset?: Nullable<string>;
    memoryMax?: Nullable<string>;
    memoryType?: Nullable<MemoryType>;
    memorySlots?: Nullable<string>;
    color?: Nullable<string>;
}

export interface CreatePowerSupplyInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    model: string;
    type: string;
    wattage: string;
    color: string;
    fanless: boolean;
    SATAConnectors: string;
    length: string;
}

export interface UpdatePowerSupplyInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    model?: Nullable<string>;
    type?: Nullable<string>;
    wattage?: Nullable<string>;
    color?: Nullable<string>;
    fanless?: Nullable<boolean>;
    SATAConnectors?: Nullable<string>;
    length?: Nullable<string>;
}

export interface CreateStorageInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    capacity: string;
    type: StorageType;
    formFactor: string;
    interface: string;
    NVME: boolean;
}

export interface UpdateStorageInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    capacity?: Nullable<string>;
    type?: Nullable<StorageType>;
    formFactor?: Nullable<string>;
    interface?: Nullable<string>;
    NVME?: Nullable<boolean>;
}

export interface CreateVideoCardInput {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    model: string;
    chipset: string;
    memory: string;
    memoryType: string;
    coreClock: string;
    interface: string;
    color: string;
    TDP: string;
    coolingFans: string;
    displayPortOutputs: string;
    HDMIOutputs: string;
}

export interface UpdateVideoCardInput {
    name?: Nullable<string>;
    price?: Nullable<string>;
    manufacturer?: Nullable<string>;
    partNumber?: Nullable<string>;
    model?: Nullable<string>;
    chipset?: Nullable<string>;
    memory?: Nullable<string>;
    memoryType?: Nullable<string>;
    coreClock?: Nullable<string>;
    interface?: Nullable<string>;
    color?: Nullable<string>;
    TDP?: Nullable<string>;
    coolingFans?: Nullable<string>;
    displayPortOutputs?: Nullable<string>;
    HDMIOutputs?: Nullable<string>;
}

export interface CreateUserInput {
    username: string;
    password: string;
    name: string;
    email: string;
}

export interface UpdateUserInput {
    name?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
}

export interface Case {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    color: string;
    type: CaseType;
    formFactor: string;
    interface: string;
    powerSupply: boolean;
    sidePanel: SidePanelType;
}

export interface IQuery {
    getCases(): Nullable<Case>[] | Promise<Nullable<Case>[]>;
    getCase(id: ObjectId): Nullable<Case> | Promise<Nullable<Case>>;
    getCPUs(): Nullable<CPU>[] | Promise<Nullable<CPU>[]>;
    getCPU(id: ObjectId): Nullable<CPU> | Promise<Nullable<CPU>>;
    getMemorys(): Nullable<Memory>[] | Promise<Nullable<Memory>[]>;
    getMemory(id: ObjectId): Nullable<Memory> | Promise<Nullable<Memory>>;
    getMotherboards(): Nullable<Motherboard>[] | Promise<Nullable<Motherboard>[]>;
    getMotherboard(id: ObjectId): Nullable<Motherboard> | Promise<Nullable<Motherboard>>;
    getPowerSupplys(): Nullable<PowerSupply>[] | Promise<Nullable<PowerSupply>[]>;
    getPowerSupply(id: ObjectId): Nullable<PowerSupply> | Promise<Nullable<PowerSupply>>;
    getStorages(): Nullable<Storage>[] | Promise<Nullable<Storage>[]>;
    getStorage(id: ObjectId): Nullable<Storage> | Promise<Nullable<Storage>>;
    getVideoCards(): Nullable<VideoCard>[] | Promise<Nullable<VideoCard>[]>;
    getVideoCard(id: ObjectId): Nullable<VideoCard> | Promise<Nullable<VideoCard>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createCase(createCaseInput: CreateCaseInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateCase(id: ObjectId, updateCaseInput: UpdateCaseInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteCase(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createCPU(createCPUInput: CreateCPUInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateCPU(id: ObjectId, updateCPUInput: UpdateCPUInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteCPU(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createMemory(createMemoryInput: CreateMemoryInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateMemory(id: ObjectId, updateMemoryInput: UpdateMemoryInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteMemory(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createMotherboard(createMotherboardInput: CreateMotherboardInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateMotherboard(id: ObjectId, updateMotherboardInput: UpdateMotherboardInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteMotherboard(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createPowerSupply(createPowerSupplyInput: CreatePowerSupplyInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updatePowerSupply(id: ObjectId, updatePowerSupplyInput: UpdatePowerSupplyInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deletePowerSupply(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createStorage(createStorageInput: CreateStorageInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateStorage(id: ObjectId, updateStorageInput: UpdateStorageInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteStorage(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createVideoCard(createVideoCardInput: CreateVideoCardInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateVideoCard(id: ObjectId, updateVideoCardInput: UpdateVideoCardInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteVideoCard(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface CPU {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    socket: string;
    series: string;
    microarchitecture: string;
    coreFamily: string;
    coreCount: string;
    coreClock: string;
    tdp: string;
    integratedGraphics: string;
    cooler: boolean;
    packaging: PackagingType;
}

export interface Memory {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    speed: string;
    formFactor: string;
    modules: string;
    voltage: string;
    heatSpreader: boolean;
    color: string;
}

export interface Motherboard {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    socket: string;
    formFactor: string;
    chipset: string;
    memoryMax: string;
    memoryType: MemoryType;
    memorySlots: string;
    color: string;
}

export interface PowerSupply {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    model: string;
    type: string;
    wattage: string;
    color: string;
    fanless: boolean;
    SATAConnectors: string;
    length: string;
}

export interface Storage {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    capacity: string;
    type: StorageType;
    formFactor: string;
    interface: string;
    NVME: boolean;
}

export interface VideoCard {
    id: ObjectId;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    model: string;
    chipset: string;
    memory: string;
    memoryType: string;
    coreClock: string;
    interface: string;
    color: string;
    TDP: string;
    coolingFans: string;
    displayPortOutputs: string;
    HDMIOutputs: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    dateTimeCreated: Date;
    dateTimeUpdated: Date;
}

export type ObjectId = _ObjectId;
type Nullable<T> = T | null;
