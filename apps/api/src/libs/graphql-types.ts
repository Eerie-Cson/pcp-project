
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { ObjectId as _ObjectId } from '@pcp/object-id'

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export enum AccountType {
    MEMBER = "MEMBER",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export enum CaseType {
    ATX_MID_TOWER = "ATX_MID_TOWER",
    EATX = "EATX",
    ATX = "ATX",
    MICRO_ATX = "MICRO_ATX",
    MINI_ITX = "MINI_ITX"
}

export enum SidePanelType {
    TEMPERED_GLASS = "TEMPERED_GLASS",
    TINTED_TEMPERED_GLASS = "TINTED_TEMPERED_GLASS"
}

export enum ComponentType {
    CASE = "CASE",
    CPU = "CPU",
    MEMORY = "MEMORY",
    MOTHERBOARD = "MOTHERBOARD",
    POWER_SUPPLY = "POWER_SUPPLY",
    STORAGE = "STORAGE",
    VIDEO_CARD = "VIDEO_CARD"
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

export interface CreateAccountInput {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    role: AccountType;
}

export interface UpdateAccountInput {
    name?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
}

export interface ObjectIdFilterInput {
    equal?: Nullable<ObjectId>;
    notEqual?: Nullable<ObjectId>;
    in?: Nullable<ObjectId[]>;
    notIn?: Nullable<ObjectId[]>;
}

export interface StringFilterInput {
    equal?: Nullable<string>;
    notEqual?: Nullable<string>;
    in?: Nullable<string[]>;
    notIn?: Nullable<string[]>;
    contains?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export interface BooleanFilterInput {
    equal?: Nullable<boolean>;
    notEqual?: Nullable<boolean>;
}

export interface EmailAddressFilterInput {
    equal?: Nullable<EmailAddress>;
    notEqual?: Nullable<EmailAddress>;
    in?: Nullable<EmailAddress[]>;
    notIn?: Nullable<EmailAddress[]>;
    contains?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export interface DateFilterInput {
    equal?: Nullable<Date>;
    notEqual?: Nullable<Date>;
    in?: Nullable<Date[]>;
    notIn?: Nullable<Date[]>;
    lesserThan?: Nullable<Date>;
    lesserThanOrEqual?: Nullable<Date>;
    greaterThan?: Nullable<Date>;
    greaterThanOrEqual?: Nullable<Date>;
}

export interface DateTimeFilterInput {
    equal?: Nullable<DateTime>;
    notEqual?: Nullable<DateTime>;
    in?: Nullable<DateTime[]>;
    notIn?: Nullable<DateTime[]>;
    lesserThan?: Nullable<DateTime>;
    lesserThanOrEqual?: Nullable<DateTime>;
    greaterThan?: Nullable<DateTime>;
    greaterThanOrEqual?: Nullable<DateTime>;
}

export interface DecimalFilterInput {
    equal?: Nullable<Decimal>;
    notEqual?: Nullable<Decimal>;
    in?: Nullable<Decimal[]>;
    notIn?: Nullable<Decimal[]>;
    lesserThan?: Nullable<Decimal>;
    lesserThanOrEqual?: Nullable<Decimal>;
    greaterThan?: Nullable<Decimal>;
    greaterThanOrEqual?: Nullable<Decimal>;
}

export interface IntFilterInput {
    equal?: Nullable<number>;
    notEqual?: Nullable<number>;
    in?: Nullable<number[]>;
    notIn?: Nullable<number[]>;
    lesserThan?: Nullable<number>;
    lesserThanOrEqual?: Nullable<number>;
    greaterThan?: Nullable<number>;
    greaterThanOrEqual?: Nullable<number>;
}

export interface ComponentBuildInput {
    case?: Nullable<string>;
    cpu?: Nullable<string>;
    memory?: Nullable<string>;
    motherboard?: Nullable<string>;
    powerSupply?: Nullable<string>;
    storage?: Nullable<string>;
    videoCard?: Nullable<string>;
}

export interface CreateBuildInput {
    id: string;
    name: string;
    user: string;
    description?: Nullable<string>;
    components: ComponentBuildInput;
    datePublished?: Nullable<Date>;
}

export interface UpdateBuildInput {
    user: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    components?: Nullable<ComponentBuildInput>;
}

export interface CreateCaseInput {
    id: string;
    name: string;
    componentType: ComponentType;
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
    id: string;
    name: string;
    price: string;
    componentType: ComponentType;
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

export interface Node {
    id: ObjectId;
}

export interface Account {
    id: string;
    username: string;
    name: string;
    email: string;
    role: AccountType;
}

export interface IQuery {
    accounts(): Nullable<Account>[] | Promise<Nullable<Account>[]>;
    account(id: string): Nullable<Account> | Promise<Nullable<Account>>;
    node(id?: Nullable<ObjectId>): Nullable<Node> | Promise<Nullable<Node>>;
    getBuilds(): Nullable<Build>[] | Promise<Nullable<Build>[]>;
    getBuild(id: ObjectId): Nullable<Build> | Promise<Nullable<Build>>;
    cases(): Nullable<Case>[] | Promise<Nullable<Case>[]>;
    case(id: string): Nullable<Case> | Promise<Nullable<Case>>;
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
}

export interface IMutation {
    createAccount(createAccountInput: CreateAccountInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateAccount(id: string, updateAccountInput: UpdateAccountInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteAccount(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createBuild(createBuildInput: CreateBuildInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateBuild(id: ObjectId, updateBuildInput: UpdateBuildInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteBuild(id: ObjectId): Nullable<boolean> | Promise<Nullable<boolean>>;
    createCase(createCaseInput: CreateCaseInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateCase(id: string, updateCaseInput: UpdateCaseInput): Nullable<boolean> | Promise<Nullable<boolean>>;
    deleteCase(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
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
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor?: Nullable<Cursor>;
}

export interface Edge {
    cursor: Cursor;
    node: Node;
}

export interface Connection {
    totalCount: number;
    edges: Edge[];
    pageInfo: PageInfo;
}

export interface Build {
    id: ObjectId;
    name: string;
    user: ObjectId;
    description: string;
    components: Component;
    totalPrice: string;
    dateCreated: Date;
    dateUpdated: Date;
    datePublished?: Nullable<Date>;
}

export interface Component {
    case: ObjectId;
    cpu: ObjectId;
    memory: ObjectId;
    motherboard: ObjectId;
    powerSupply: ObjectId;
    storage: ObjectId;
    videoCard: ObjectId;
}

export interface Case {
    id: string;
    name: string;
    componentType: ComponentType;
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

export interface CPU {
    id: string;
    name: string;
    price: string;
    manufacturer: string;
    partNumber: string;
    componentType: ComponentType;
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

export type ObjectId = _ObjectId;
export type DateTime = Date;
export type JSON = Record<string, any>;
export type EmailAddress = string;
export type Cursor = unknown;
export type URL = string;
export type Decimal = unknown;
export type Timezone = unknown;
export type Upload = unknown;
type Nullable<T> = T | null;
