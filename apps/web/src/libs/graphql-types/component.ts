import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
};

export type Cpu = {
  __typename?: 'CPU';
  componentType: ComponentType;
  cooler: Scalars['Boolean']['output'];
  coreClock: Scalars['String']['output'];
  coreCount: Scalars['String']['output'];
  coreFamily: Scalars['String']['output'];
  id: Scalars['String']['output'];
  integratedGraphics: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  microarchitecture: Scalars['String']['output'];
  name: Scalars['String']['output'];
  packaging: PackagingType;
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
  series: Scalars['String']['output'];
  socket: Scalars['String']['output'];
  tdp: Scalars['String']['output'];
};

export type Case = {
  __typename?: 'Case';
  color: Scalars['String']['output'];
  componentType: ComponentType;
  formFactor: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interface: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  powerSupply: Scalars['Boolean']['output'];
  price: Scalars['String']['output'];
  sidePanel: SidePanelType;
  type: CaseType;
};

export enum CaseType {
  Atx = 'ATX',
  AtxMidTower = 'ATX_MID_TOWER',
  Eatx = 'EATX',
  MicroAtx = 'MICRO_ATX',
  MiniItx = 'MINI_ITX'
}

export enum ComponentType {
  Case = 'CASE',
  Cpu = 'CPU',
  Memory = 'MEMORY',
  Motherboard = 'MOTHERBOARD',
  PowerSupply = 'POWER_SUPPLY',
  Storage = 'STORAGE',
  VideoCard = 'VIDEO_CARD'
}

export type CreateCpuInput = {
  componentType: ComponentType;
  cooler: Scalars['Boolean']['input'];
  coreClock: Scalars['String']['input'];
  coreCount: Scalars['String']['input'];
  coreFamily: Scalars['String']['input'];
  id: Scalars['String']['input'];
  integratedGraphics: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  microarchitecture: Scalars['String']['input'];
  name: Scalars['String']['input'];
  packaging: PackagingType;
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
  series: Scalars['String']['input'];
  socket: Scalars['String']['input'];
  tdp: Scalars['String']['input'];
};

export type CreateCaseInput = {
  color: Scalars['String']['input'];
  componentType: ComponentType;
  formFactor: Scalars['String']['input'];
  id: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  powerSupply: Scalars['Boolean']['input'];
  price: Scalars['String']['input'];
  sidePanel: SidePanelType;
  type: CaseType;
};

export type CreateMemoryInput = {
  color: Scalars['String']['input'];
  componentType: ComponentType;
  formFactor: Scalars['String']['input'];
  heatSpreader: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  modules: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
  speed: Scalars['String']['input'];
  voltage: Scalars['String']['input'];
};

export type CreateMotherboardInput = {
  chipset: Scalars['String']['input'];
  color: Scalars['String']['input'];
  componentType: ComponentType;
  formFactor: Scalars['String']['input'];
  id: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  memoryMax: Scalars['String']['input'];
  memorySlots: Scalars['String']['input'];
  memoryType: MemoryType;
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
  socket: Scalars['String']['input'];
};

export type CreatePowerSupplyInput = {
  SATAConnectors: Scalars['String']['input'];
  color: Scalars['String']['input'];
  componentType: ComponentType;
  fanless: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  length: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  model: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
  type: Scalars['String']['input'];
  wattage: Scalars['String']['input'];
};

export type CreateStorageInput = {
  NVME: Scalars['Boolean']['input'];
  capacity: Scalars['String']['input'];
  componentType: ComponentType;
  formFactor: Scalars['String']['input'];
  id: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
  type: StorageType;
};

export type CreateVideoCardInput = {
  HDMIOutputs: Scalars['String']['input'];
  TDP: Scalars['String']['input'];
  chipset: Scalars['String']['input'];
  color: Scalars['String']['input'];
  componentType: ComponentType;
  coolingFans: Scalars['String']['input'];
  coreClock: Scalars['String']['input'];
  displayPortOutputs: Scalars['String']['input'];
  id: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  memory: Scalars['String']['input'];
  memoryType: Scalars['String']['input'];
  model: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  price: Scalars['String']['input'];
};

export type Memory = {
  __typename?: 'Memory';
  color: Scalars['String']['output'];
  componentType: ComponentType;
  formFactor: Scalars['String']['output'];
  heatSpreader: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  modules: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
  speed: Scalars['String']['output'];
  voltage: Scalars['String']['output'];
};

export enum MemoryType {
  Ddr3 = 'DDR3',
  Ddr4 = 'DDR4',
  Ddr5 = 'DDR5'
}

export type Motherboard = {
  __typename?: 'Motherboard';
  chipset: Scalars['String']['output'];
  color: Scalars['String']['output'];
  componentType: ComponentType;
  formFactor: Scalars['String']['output'];
  id: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  memoryMax: Scalars['String']['output'];
  memorySlots: Scalars['String']['output'];
  memoryType: MemoryType;
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
  socket: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCPU?: Maybe<Scalars['Boolean']['output']>;
  createCase?: Maybe<Scalars['Boolean']['output']>;
  createMemory?: Maybe<Scalars['Boolean']['output']>;
  createMotherboard?: Maybe<Scalars['Boolean']['output']>;
  createPowerSupply?: Maybe<Scalars['Boolean']['output']>;
  createStorage?: Maybe<Scalars['Boolean']['output']>;
  createVideoCard?: Maybe<Scalars['Boolean']['output']>;
  deleteCPU?: Maybe<Scalars['Boolean']['output']>;
  deleteCase?: Maybe<Scalars['Boolean']['output']>;
  deleteMemory?: Maybe<Scalars['Boolean']['output']>;
  deleteMotherboard?: Maybe<Scalars['Boolean']['output']>;
  deletePowerSupply?: Maybe<Scalars['Boolean']['output']>;
  deleteStorage?: Maybe<Scalars['Boolean']['output']>;
  deleteVideoCard?: Maybe<Scalars['Boolean']['output']>;
  updateCPU?: Maybe<Scalars['Boolean']['output']>;
  updateCase?: Maybe<Scalars['Boolean']['output']>;
  updateMemory?: Maybe<Scalars['Boolean']['output']>;
  updateMotherboard?: Maybe<Scalars['Boolean']['output']>;
  updatePowerSupply?: Maybe<Scalars['Boolean']['output']>;
  updateStorage?: Maybe<Scalars['Boolean']['output']>;
  updateVideoCard?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateCpuArgs = {
  createCPUInput: CreateCpuInput;
};


export type MutationCreateCaseArgs = {
  createCaseInput: CreateCaseInput;
};


export type MutationCreateMemoryArgs = {
  createMemoryInput: CreateMemoryInput;
};


export type MutationCreateMotherboardArgs = {
  createMotherboardInput: CreateMotherboardInput;
};


export type MutationCreatePowerSupplyArgs = {
  createPowerSupplyInput: CreatePowerSupplyInput;
};


export type MutationCreateStorageArgs = {
  createStorageInput: CreateStorageInput;
};


export type MutationCreateVideoCardArgs = {
  createVideoCardInput: CreateVideoCardInput;
};


export type MutationDeleteCpuArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteCaseArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMemoryArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteMotherboardArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeletePowerSupplyArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteStorageArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteVideoCardArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationUpdateCpuArgs = {
  id: Scalars['ObjectId']['input'];
  updateCPUInput: UpdateCpuInput;
};


export type MutationUpdateCaseArgs = {
  id: Scalars['String']['input'];
  updateCaseInput: UpdateCaseInput;
};


export type MutationUpdateMemoryArgs = {
  id: Scalars['ObjectId']['input'];
  updateMemoryInput: UpdateMemoryInput;
};


export type MutationUpdateMotherboardArgs = {
  id: Scalars['ObjectId']['input'];
  updateMotherboardInput: UpdateMotherboardInput;
};


export type MutationUpdatePowerSupplyArgs = {
  id: Scalars['ObjectId']['input'];
  updatePowerSupplyInput: UpdatePowerSupplyInput;
};


export type MutationUpdateStorageArgs = {
  id: Scalars['ObjectId']['input'];
  updateStorageInput: UpdateStorageInput;
};


export type MutationUpdateVideoCardArgs = {
  id: Scalars['ObjectId']['input'];
  updateVideoCardInput: UpdateVideoCardInput;
};

export enum PackagingType {
  Boxed = 'BOXED'
}

export type PowerSupply = {
  __typename?: 'PowerSupply';
  SATAConnectors: Scalars['String']['output'];
  color: Scalars['String']['output'];
  componentType: ComponentType;
  fanless: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  length: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
  type: Scalars['String']['output'];
  wattage: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  CPU?: Maybe<Cpu>;
  CPUs: Array<Maybe<Cpu>>;
  case?: Maybe<Case>;
  cases: Array<Maybe<Case>>;
  getStorage?: Maybe<Storage>;
  getStorages: Array<Maybe<Storage>>;
  memory?: Maybe<Memory>;
  memorys: Array<Maybe<Memory>>;
  motherboard?: Maybe<Motherboard>;
  motherboards: Array<Maybe<Motherboard>>;
  powerSupplies: Array<Maybe<PowerSupply>>;
  powerSupply?: Maybe<PowerSupply>;
  videoCard?: Maybe<VideoCard>;
  videoCards: Array<Maybe<VideoCard>>;
};


export type QueryCpuArgs = {
  id: Scalars['String']['input'];
};


export type QueryCaseArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStorageArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryMemoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryMotherboardArgs = {
  id: Scalars['String']['input'];
};


export type QueryPowerSupplyArgs = {
  id: Scalars['String']['input'];
};


export type QueryVideoCardArgs = {
  id: Scalars['String']['input'];
};

export enum SidePanelType {
  TemperedGlass = 'TEMPERED_GLASS',
  TintedTemperedGlass = 'TINTED_TEMPERED_GLASS'
}

export type Storage = {
  __typename?: 'Storage';
  NVME: Scalars['Boolean']['output'];
  capacity: Scalars['String']['output'];
  componentType: ComponentType;
  formFactor: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interface: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
  type: StorageType;
};

export enum StorageType {
  Hdd = 'HDD',
  Ssd = 'SSD'
}

export type UpdateCpuInput = {
  cooler?: InputMaybe<Scalars['Boolean']['input']>;
  coreClock?: InputMaybe<Scalars['String']['input']>;
  coreCount?: InputMaybe<Scalars['String']['input']>;
  coreFamily?: InputMaybe<Scalars['String']['input']>;
  integratedGraphics?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  microarchitecture?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  packaging?: InputMaybe<PackagingType>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Scalars['String']['input']>;
  socket?: InputMaybe<Scalars['String']['input']>;
  tdp?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCaseInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  formFactor?: InputMaybe<Scalars['String']['input']>;
  interface?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  powerSupply?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  sidePanel?: InputMaybe<SidePanelType>;
  type?: InputMaybe<CaseType>;
};

export type UpdateMemoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  formFactor?: InputMaybe<Scalars['String']['input']>;
  heatSpreader?: InputMaybe<Scalars['Boolean']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  modules?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  speed?: InputMaybe<Scalars['String']['input']>;
  voltage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMotherboardInput = {
  chipset?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  formFactor?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  memoryMax?: InputMaybe<Scalars['String']['input']>;
  memorySlots?: InputMaybe<Scalars['String']['input']>;
  memoryType?: InputMaybe<MemoryType>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  socket?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePowerSupplyInput = {
  SATAConnectors?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  fanless?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  wattage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStorageInput = {
  NVME?: InputMaybe<Scalars['Boolean']['input']>;
  capacity?: InputMaybe<Scalars['String']['input']>;
  formFactor?: InputMaybe<Scalars['String']['input']>;
  interface?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<StorageType>;
};

export type UpdateVideoCardInput = {
  HDMIOutputs?: InputMaybe<Scalars['String']['input']>;
  TDP?: InputMaybe<Scalars['String']['input']>;
  chipset?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  coolingFans?: InputMaybe<Scalars['String']['input']>;
  coreClock?: InputMaybe<Scalars['String']['input']>;
  displayPortOutputs?: InputMaybe<Scalars['String']['input']>;
  interface?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  memory?: InputMaybe<Scalars['String']['input']>;
  memoryType?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
};

export type VideoCard = {
  __typename?: 'VideoCard';
  HDMIOutputs: Scalars['String']['output'];
  TDP: Scalars['String']['output'];
  chipset: Scalars['String']['output'];
  color: Scalars['String']['output'];
  componentType: ComponentType;
  coolingFans: Scalars['String']['output'];
  coreClock: Scalars['String']['output'];
  displayPortOutputs: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interface: Scalars['String']['output'];
  manufacturer: Scalars['String']['output'];
  memory: Scalars['String']['output'];
  memoryType: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  partNumber: Scalars['String']['output'];
  price: Scalars['String']['output'];
};

export type Create_CaseMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  componentType: ComponentType;
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  color: Scalars['String']['input'];
  type: CaseType;
  formFactor: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  powerSupply: Scalars['Boolean']['input'];
  sidePanel: SidePanelType;
}>;


export type Create_CaseMutation = { __typename?: 'Mutation', createCase?: boolean | null };

export type Create_CpuMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['String']['input'];
  componentType: ComponentType;
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  series: Scalars['String']['input'];
  microarchitecture: Scalars['String']['input'];
  coreFamily: Scalars['String']['input'];
  socket: Scalars['String']['input'];
  coreCount: Scalars['String']['input'];
  coreClock: Scalars['String']['input'];
  tdp: Scalars['String']['input'];
  integratedGraphics: Scalars['String']['input'];
  cooler: Scalars['Boolean']['input'];
  packaging: PackagingType;
}>;


export type Create_CpuMutation = { __typename?: 'Mutation', createCPU?: boolean | null };

export type Create_MemoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  componentType: ComponentType;
  speed: Scalars['String']['input'];
  formFactor: Scalars['String']['input'];
  modules: Scalars['String']['input'];
  voltage: Scalars['String']['input'];
  heatSpreader: Scalars['Boolean']['input'];
  color: Scalars['String']['input'];
}>;


export type Create_MemoryMutation = { __typename?: 'Mutation', createMemory?: boolean | null };

export type Create_MotherboardMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  componentType: ComponentType;
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  socket: Scalars['String']['input'];
  formFactor: Scalars['String']['input'];
  chipset: Scalars['String']['input'];
  memoryMax: Scalars['String']['input'];
  memoryType: MemoryType;
  memorySlots: Scalars['String']['input'];
  color: Scalars['String']['input'];
}>;


export type Create_MotherboardMutation = { __typename?: 'Mutation', createMotherboard?: boolean | null };

export type Create_Power_SupplyMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  componentType: ComponentType;
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  model: Scalars['String']['input'];
  type: Scalars['String']['input'];
  wattage: Scalars['String']['input'];
  color: Scalars['String']['input'];
  fanless: Scalars['Boolean']['input'];
  SATAConnectors: Scalars['String']['input'];
  length: Scalars['String']['input'];
}>;


export type Create_Power_SupplyMutation = { __typename?: 'Mutation', createPowerSupply?: boolean | null };

export type Create_StorageMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  componentType: ComponentType;
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  capacity: Scalars['String']['input'];
  type: StorageType;
  formFactor: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  NVME: Scalars['Boolean']['input'];
}>;


export type Create_StorageMutation = { __typename?: 'Mutation', createStorage?: boolean | null };

export type Create_Video_CardMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  componentType: ComponentType;
  price: Scalars['String']['input'];
  manufacturer: Scalars['String']['input'];
  partNumber: Scalars['String']['input'];
  model: Scalars['String']['input'];
  chipset: Scalars['String']['input'];
  memory: Scalars['String']['input'];
  memoryType: Scalars['String']['input'];
  coreClock: Scalars['String']['input'];
  interface: Scalars['String']['input'];
  color: Scalars['String']['input'];
  TDP: Scalars['String']['input'];
  coolingFans: Scalars['String']['input'];
  displayPortOutputs: Scalars['String']['input'];
  HDMIOutputs: Scalars['String']['input'];
}>;


export type Create_Video_CardMutation = { __typename?: 'Mutation', createVideoCard?: boolean | null };

export type CasesQueryVariables = Exact<{ [key: string]: never; }>;


export type CasesQuery = { __typename?: 'Query', cases: Array<{ __typename?: 'Case', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, color: string, type: CaseType, formFactor: string, interface: string, powerSupply: boolean, sidePanel: SidePanelType } | null> };

export type CpUsQueryVariables = Exact<{ [key: string]: never; }>;


export type CpUsQuery = { __typename?: 'Query', CPUs: Array<{ __typename?: 'CPU', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, series: string, microarchitecture: string, coreFamily: string, socket: string, coreCount: string, coreClock: string, tdp: string, integratedGraphics: string, cooler: boolean, packaging: PackagingType } | null> };

export type MemorysQueryVariables = Exact<{ [key: string]: never; }>;


export type MemorysQuery = { __typename?: 'Query', memorys: Array<{ __typename?: 'Memory', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, speed: string, formFactor: string, modules: string, voltage: string, heatSpreader: boolean, color: string } | null> };

export type MotherboardsQueryVariables = Exact<{ [key: string]: never; }>;


export type MotherboardsQuery = { __typename?: 'Query', motherboards: Array<{ __typename?: 'Motherboard', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, socket: string, formFactor: string, chipset: string, memoryMax: string, memoryType: MemoryType, memorySlots: string, color: string } | null> };

export type PowerSuppliesQueryVariables = Exact<{ [key: string]: never; }>;


export type PowerSuppliesQuery = { __typename?: 'Query', powerSupplies: Array<{ __typename?: 'PowerSupply', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, model: string, type: string, wattage: string, color: string, fanless: boolean, SATAConnectors: string, length: string } | null> };

export type VideoCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type VideoCardsQuery = { __typename?: 'Query', videoCards: Array<{ __typename?: 'VideoCard', id: string, name: string, componentType: ComponentType, price: string, manufacturer: string, partNumber: string, model: string, chipset: string, memory: string, memoryType: string, coreClock: string, interface: string, color: string, TDP: string, coolingFans: string, displayPortOutputs: string, HDMIOutputs: string } | null> };


export const Create_CaseDocument = gql`
    mutation CREATE_CASE($id: String!, $name: String!, $componentType: ComponentType!, $price: String!, $manufacturer: String!, $partNumber: String!, $color: String!, $type: CaseType!, $formFactor: String!, $interface: String!, $powerSupply: Boolean!, $sidePanel: SidePanelType!) {
  createCase(
    createCaseInput: {id: $id, name: $name, componentType: $componentType, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, color: $color, type: $type, formFactor: $formFactor, interface: $interface, powerSupply: $powerSupply, sidePanel: $sidePanel}
  )
}
    `;
export type Create_CaseMutationFn = Apollo.MutationFunction<Create_CaseMutation, Create_CaseMutationVariables>;

/**
 * __useCreate_CaseMutation__
 *
 * To run a mutation, you first call `useCreate_CaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_CaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCaseMutation, { data, loading, error }] = useCreate_CaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      componentType: // value for 'componentType'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      color: // value for 'color'
 *      type: // value for 'type'
 *      formFactor: // value for 'formFactor'
 *      interface: // value for 'interface'
 *      powerSupply: // value for 'powerSupply'
 *      sidePanel: // value for 'sidePanel'
 *   },
 * });
 */
export function useCreate_CaseMutation(baseOptions?: Apollo.MutationHookOptions<Create_CaseMutation, Create_CaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_CaseMutation, Create_CaseMutationVariables>(Create_CaseDocument, options);
      }
export type Create_CaseMutationHookResult = ReturnType<typeof useCreate_CaseMutation>;
export type Create_CaseMutationResult = Apollo.MutationResult<Create_CaseMutation>;
export type Create_CaseMutationOptions = Apollo.BaseMutationOptions<Create_CaseMutation, Create_CaseMutationVariables>;
export const Create_CpuDocument = gql`
    mutation CREATE_CPU($id: String!, $name: String!, $price: String!, $componentType: ComponentType!, $manufacturer: String!, $partNumber: String!, $series: String!, $microarchitecture: String!, $coreFamily: String!, $socket: String!, $coreCount: String!, $coreClock: String!, $tdp: String!, $integratedGraphics: String!, $cooler: Boolean!, $packaging: PackagingType!) {
  createCPU(
    createCPUInput: {id: $id, name: $name, price: $price, componentType: $componentType, manufacturer: $manufacturer, partNumber: $partNumber, series: $series, microarchitecture: $microarchitecture, coreFamily: $coreFamily, socket: $socket, coreCount: $coreCount, coreClock: $coreClock, tdp: $tdp, integratedGraphics: $integratedGraphics, cooler: $cooler, packaging: $packaging}
  )
}
    `;
export type Create_CpuMutationFn = Apollo.MutationFunction<Create_CpuMutation, Create_CpuMutationVariables>;

/**
 * __useCreate_CpuMutation__
 *
 * To run a mutation, you first call `useCreate_CpuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_CpuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCpuMutation, { data, loading, error }] = useCreate_CpuMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      componentType: // value for 'componentType'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      series: // value for 'series'
 *      microarchitecture: // value for 'microarchitecture'
 *      coreFamily: // value for 'coreFamily'
 *      socket: // value for 'socket'
 *      coreCount: // value for 'coreCount'
 *      coreClock: // value for 'coreClock'
 *      tdp: // value for 'tdp'
 *      integratedGraphics: // value for 'integratedGraphics'
 *      cooler: // value for 'cooler'
 *      packaging: // value for 'packaging'
 *   },
 * });
 */
export function useCreate_CpuMutation(baseOptions?: Apollo.MutationHookOptions<Create_CpuMutation, Create_CpuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_CpuMutation, Create_CpuMutationVariables>(Create_CpuDocument, options);
      }
export type Create_CpuMutationHookResult = ReturnType<typeof useCreate_CpuMutation>;
export type Create_CpuMutationResult = Apollo.MutationResult<Create_CpuMutation>;
export type Create_CpuMutationOptions = Apollo.BaseMutationOptions<Create_CpuMutation, Create_CpuMutationVariables>;
export const Create_MemoryDocument = gql`
    mutation CREATE_MEMORY($id: String!, $name: String!, $price: String!, $manufacturer: String!, $partNumber: String!, $componentType: ComponentType!, $speed: String!, $formFactor: String!, $modules: String!, $voltage: String!, $heatSpreader: Boolean!, $color: String!) {
  createMemory(
    createMemoryInput: {id: $id, name: $name, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, componentType: $componentType, speed: $speed, formFactor: $formFactor, modules: $modules, voltage: $voltage, heatSpreader: $heatSpreader, color: $color}
  )
}
    `;
export type Create_MemoryMutationFn = Apollo.MutationFunction<Create_MemoryMutation, Create_MemoryMutationVariables>;

/**
 * __useCreate_MemoryMutation__
 *
 * To run a mutation, you first call `useCreate_MemoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_MemoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemoryMutation, { data, loading, error }] = useCreate_MemoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      componentType: // value for 'componentType'
 *      speed: // value for 'speed'
 *      formFactor: // value for 'formFactor'
 *      modules: // value for 'modules'
 *      voltage: // value for 'voltage'
 *      heatSpreader: // value for 'heatSpreader'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreate_MemoryMutation(baseOptions?: Apollo.MutationHookOptions<Create_MemoryMutation, Create_MemoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_MemoryMutation, Create_MemoryMutationVariables>(Create_MemoryDocument, options);
      }
export type Create_MemoryMutationHookResult = ReturnType<typeof useCreate_MemoryMutation>;
export type Create_MemoryMutationResult = Apollo.MutationResult<Create_MemoryMutation>;
export type Create_MemoryMutationOptions = Apollo.BaseMutationOptions<Create_MemoryMutation, Create_MemoryMutationVariables>;
export const Create_MotherboardDocument = gql`
    mutation CREATE_MOTHERBOARD($id: String!, $name: String!, $componentType: ComponentType!, $price: String!, $manufacturer: String!, $partNumber: String!, $socket: String!, $formFactor: String!, $chipset: String!, $memoryMax: String!, $memoryType: MemoryType!, $memorySlots: String!, $color: String!) {
  createMotherboard(
    createMotherboardInput: {id: $id, name: $name, componentType: $componentType, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, socket: $socket, formFactor: $formFactor, chipset: $chipset, memoryMax: $memoryMax, memoryType: $memoryType, memorySlots: $memorySlots, color: $color}
  )
}
    `;
export type Create_MotherboardMutationFn = Apollo.MutationFunction<Create_MotherboardMutation, Create_MotherboardMutationVariables>;

/**
 * __useCreate_MotherboardMutation__
 *
 * To run a mutation, you first call `useCreate_MotherboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_MotherboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMotherboardMutation, { data, loading, error }] = useCreate_MotherboardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      componentType: // value for 'componentType'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      socket: // value for 'socket'
 *      formFactor: // value for 'formFactor'
 *      chipset: // value for 'chipset'
 *      memoryMax: // value for 'memoryMax'
 *      memoryType: // value for 'memoryType'
 *      memorySlots: // value for 'memorySlots'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreate_MotherboardMutation(baseOptions?: Apollo.MutationHookOptions<Create_MotherboardMutation, Create_MotherboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_MotherboardMutation, Create_MotherboardMutationVariables>(Create_MotherboardDocument, options);
      }
export type Create_MotherboardMutationHookResult = ReturnType<typeof useCreate_MotherboardMutation>;
export type Create_MotherboardMutationResult = Apollo.MutationResult<Create_MotherboardMutation>;
export type Create_MotherboardMutationOptions = Apollo.BaseMutationOptions<Create_MotherboardMutation, Create_MotherboardMutationVariables>;
export const Create_Power_SupplyDocument = gql`
    mutation CREATE_POWER_SUPPLY($id: String!, $name: String!, $componentType: ComponentType!, $price: String!, $manufacturer: String!, $partNumber: String!, $model: String!, $type: String!, $wattage: String!, $color: String!, $fanless: Boolean!, $SATAConnectors: String!, $length: String!) {
  createPowerSupply(
    createPowerSupplyInput: {id: $id, name: $name, componentType: $componentType, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, model: $model, type: $type, wattage: $wattage, color: $color, fanless: $fanless, SATAConnectors: $SATAConnectors, length: $length}
  )
}
    `;
export type Create_Power_SupplyMutationFn = Apollo.MutationFunction<Create_Power_SupplyMutation, Create_Power_SupplyMutationVariables>;

/**
 * __useCreate_Power_SupplyMutation__
 *
 * To run a mutation, you first call `useCreate_Power_SupplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_Power_SupplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPowerSupplyMutation, { data, loading, error }] = useCreate_Power_SupplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      componentType: // value for 'componentType'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      model: // value for 'model'
 *      type: // value for 'type'
 *      wattage: // value for 'wattage'
 *      color: // value for 'color'
 *      fanless: // value for 'fanless'
 *      SATAConnectors: // value for 'SATAConnectors'
 *      length: // value for 'length'
 *   },
 * });
 */
export function useCreate_Power_SupplyMutation(baseOptions?: Apollo.MutationHookOptions<Create_Power_SupplyMutation, Create_Power_SupplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_Power_SupplyMutation, Create_Power_SupplyMutationVariables>(Create_Power_SupplyDocument, options);
      }
export type Create_Power_SupplyMutationHookResult = ReturnType<typeof useCreate_Power_SupplyMutation>;
export type Create_Power_SupplyMutationResult = Apollo.MutationResult<Create_Power_SupplyMutation>;
export type Create_Power_SupplyMutationOptions = Apollo.BaseMutationOptions<Create_Power_SupplyMutation, Create_Power_SupplyMutationVariables>;
export const Create_StorageDocument = gql`
    mutation CREATE_STORAGE($id: String!, $name: String!, $componentType: ComponentType!, $price: String!, $manufacturer: String!, $partNumber: String!, $capacity: String!, $type: StorageType!, $formFactor: String!, $interface: String!, $NVME: Boolean!) {
  createStorage(
    createStorageInput: {id: $id, name: $name, componentType: $componentType, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, capacity: $capacity, type: $type, formFactor: $formFactor, interface: $interface, NVME: $NVME}
  )
}
    `;
export type Create_StorageMutationFn = Apollo.MutationFunction<Create_StorageMutation, Create_StorageMutationVariables>;

/**
 * __useCreate_StorageMutation__
 *
 * To run a mutation, you first call `useCreate_StorageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_StorageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStorageMutation, { data, loading, error }] = useCreate_StorageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      componentType: // value for 'componentType'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      capacity: // value for 'capacity'
 *      type: // value for 'type'
 *      formFactor: // value for 'formFactor'
 *      interface: // value for 'interface'
 *      NVME: // value for 'NVME'
 *   },
 * });
 */
export function useCreate_StorageMutation(baseOptions?: Apollo.MutationHookOptions<Create_StorageMutation, Create_StorageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_StorageMutation, Create_StorageMutationVariables>(Create_StorageDocument, options);
      }
export type Create_StorageMutationHookResult = ReturnType<typeof useCreate_StorageMutation>;
export type Create_StorageMutationResult = Apollo.MutationResult<Create_StorageMutation>;
export type Create_StorageMutationOptions = Apollo.BaseMutationOptions<Create_StorageMutation, Create_StorageMutationVariables>;
export const Create_Video_CardDocument = gql`
    mutation CREATE_VIDEO_CARD($id: String!, $name: String!, $componentType: ComponentType!, $price: String!, $manufacturer: String!, $partNumber: String!, $model: String!, $chipset: String!, $memory: String!, $memoryType: String!, $coreClock: String!, $interface: String!, $color: String!, $TDP: String!, $coolingFans: String!, $displayPortOutputs: String!, $HDMIOutputs: String!) {
  createVideoCard(
    createVideoCardInput: {id: $id, name: $name, componentType: $componentType, price: $price, manufacturer: $manufacturer, partNumber: $partNumber, model: $model, chipset: $chipset, memory: $memory, memoryType: $memoryType, coreClock: $coreClock, interface: $interface, color: $color, TDP: $TDP, coolingFans: $coolingFans, displayPortOutputs: $displayPortOutputs, HDMIOutputs: $HDMIOutputs}
  )
}
    `;
export type Create_Video_CardMutationFn = Apollo.MutationFunction<Create_Video_CardMutation, Create_Video_CardMutationVariables>;

/**
 * __useCreate_Video_CardMutation__
 *
 * To run a mutation, you first call `useCreate_Video_CardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_Video_CardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoCardMutation, { data, loading, error }] = useCreate_Video_CardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      componentType: // value for 'componentType'
 *      price: // value for 'price'
 *      manufacturer: // value for 'manufacturer'
 *      partNumber: // value for 'partNumber'
 *      model: // value for 'model'
 *      chipset: // value for 'chipset'
 *      memory: // value for 'memory'
 *      memoryType: // value for 'memoryType'
 *      coreClock: // value for 'coreClock'
 *      interface: // value for 'interface'
 *      color: // value for 'color'
 *      TDP: // value for 'TDP'
 *      coolingFans: // value for 'coolingFans'
 *      displayPortOutputs: // value for 'displayPortOutputs'
 *      HDMIOutputs: // value for 'HDMIOutputs'
 *   },
 * });
 */
export function useCreate_Video_CardMutation(baseOptions?: Apollo.MutationHookOptions<Create_Video_CardMutation, Create_Video_CardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_Video_CardMutation, Create_Video_CardMutationVariables>(Create_Video_CardDocument, options);
      }
export type Create_Video_CardMutationHookResult = ReturnType<typeof useCreate_Video_CardMutation>;
export type Create_Video_CardMutationResult = Apollo.MutationResult<Create_Video_CardMutation>;
export type Create_Video_CardMutationOptions = Apollo.BaseMutationOptions<Create_Video_CardMutation, Create_Video_CardMutationVariables>;
export const CasesDocument = gql`
    query cases {
  cases {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    color
    type
    formFactor
    interface
    powerSupply
    sidePanel
  }
}
    `;

/**
 * __useCasesQuery__
 *
 * To run a query within a React component, call `useCasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCasesQuery(baseOptions?: Apollo.QueryHookOptions<CasesQuery, CasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CasesQuery, CasesQueryVariables>(CasesDocument, options);
      }
export function useCasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CasesQuery, CasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CasesQuery, CasesQueryVariables>(CasesDocument, options);
        }
export function useCasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CasesQuery, CasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CasesQuery, CasesQueryVariables>(CasesDocument, options);
        }
export type CasesQueryHookResult = ReturnType<typeof useCasesQuery>;
export type CasesLazyQueryHookResult = ReturnType<typeof useCasesLazyQuery>;
export type CasesSuspenseQueryHookResult = ReturnType<typeof useCasesSuspenseQuery>;
export type CasesQueryResult = Apollo.QueryResult<CasesQuery, CasesQueryVariables>;
export const CpUsDocument = gql`
    query CPUs {
  CPUs {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    series
    microarchitecture
    coreFamily
    socket
    coreCount
    coreClock
    tdp
    integratedGraphics
    cooler
    packaging
  }
}
    `;

/**
 * __useCpUsQuery__
 *
 * To run a query within a React component, call `useCpUsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCpUsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCpUsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCpUsQuery(baseOptions?: Apollo.QueryHookOptions<CpUsQuery, CpUsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CpUsQuery, CpUsQueryVariables>(CpUsDocument, options);
      }
export function useCpUsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CpUsQuery, CpUsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CpUsQuery, CpUsQueryVariables>(CpUsDocument, options);
        }
export function useCpUsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CpUsQuery, CpUsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CpUsQuery, CpUsQueryVariables>(CpUsDocument, options);
        }
export type CpUsQueryHookResult = ReturnType<typeof useCpUsQuery>;
export type CpUsLazyQueryHookResult = ReturnType<typeof useCpUsLazyQuery>;
export type CpUsSuspenseQueryHookResult = ReturnType<typeof useCpUsSuspenseQuery>;
export type CpUsQueryResult = Apollo.QueryResult<CpUsQuery, CpUsQueryVariables>;
export const MemorysDocument = gql`
    query memorys {
  memorys {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    speed
    formFactor
    modules
    voltage
    heatSpreader
    color
  }
}
    `;

/**
 * __useMemorysQuery__
 *
 * To run a query within a React component, call `useMemorysQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemorysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemorysQuery({
 *   variables: {
 *   },
 * });
 */
export function useMemorysQuery(baseOptions?: Apollo.QueryHookOptions<MemorysQuery, MemorysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemorysQuery, MemorysQueryVariables>(MemorysDocument, options);
      }
export function useMemorysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemorysQuery, MemorysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemorysQuery, MemorysQueryVariables>(MemorysDocument, options);
        }
export function useMemorysSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MemorysQuery, MemorysQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MemorysQuery, MemorysQueryVariables>(MemorysDocument, options);
        }
export type MemorysQueryHookResult = ReturnType<typeof useMemorysQuery>;
export type MemorysLazyQueryHookResult = ReturnType<typeof useMemorysLazyQuery>;
export type MemorysSuspenseQueryHookResult = ReturnType<typeof useMemorysSuspenseQuery>;
export type MemorysQueryResult = Apollo.QueryResult<MemorysQuery, MemorysQueryVariables>;
export const MotherboardsDocument = gql`
    query motherboards {
  motherboards {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    socket
    formFactor
    chipset
    memoryMax
    memoryType
    memorySlots
    color
  }
}
    `;

/**
 * __useMotherboardsQuery__
 *
 * To run a query within a React component, call `useMotherboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMotherboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMotherboardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMotherboardsQuery(baseOptions?: Apollo.QueryHookOptions<MotherboardsQuery, MotherboardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MotherboardsQuery, MotherboardsQueryVariables>(MotherboardsDocument, options);
      }
export function useMotherboardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MotherboardsQuery, MotherboardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MotherboardsQuery, MotherboardsQueryVariables>(MotherboardsDocument, options);
        }
export function useMotherboardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MotherboardsQuery, MotherboardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MotherboardsQuery, MotherboardsQueryVariables>(MotherboardsDocument, options);
        }
export type MotherboardsQueryHookResult = ReturnType<typeof useMotherboardsQuery>;
export type MotherboardsLazyQueryHookResult = ReturnType<typeof useMotherboardsLazyQuery>;
export type MotherboardsSuspenseQueryHookResult = ReturnType<typeof useMotherboardsSuspenseQuery>;
export type MotherboardsQueryResult = Apollo.QueryResult<MotherboardsQuery, MotherboardsQueryVariables>;
export const PowerSuppliesDocument = gql`
    query powerSupplies {
  powerSupplies {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    model
    type
    wattage
    color
    fanless
    SATAConnectors
    length
  }
}
    `;

/**
 * __usePowerSuppliesQuery__
 *
 * To run a query within a React component, call `usePowerSuppliesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePowerSuppliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePowerSuppliesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePowerSuppliesQuery(baseOptions?: Apollo.QueryHookOptions<PowerSuppliesQuery, PowerSuppliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PowerSuppliesQuery, PowerSuppliesQueryVariables>(PowerSuppliesDocument, options);
      }
export function usePowerSuppliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PowerSuppliesQuery, PowerSuppliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PowerSuppliesQuery, PowerSuppliesQueryVariables>(PowerSuppliesDocument, options);
        }
export function usePowerSuppliesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PowerSuppliesQuery, PowerSuppliesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PowerSuppliesQuery, PowerSuppliesQueryVariables>(PowerSuppliesDocument, options);
        }
export type PowerSuppliesQueryHookResult = ReturnType<typeof usePowerSuppliesQuery>;
export type PowerSuppliesLazyQueryHookResult = ReturnType<typeof usePowerSuppliesLazyQuery>;
export type PowerSuppliesSuspenseQueryHookResult = ReturnType<typeof usePowerSuppliesSuspenseQuery>;
export type PowerSuppliesQueryResult = Apollo.QueryResult<PowerSuppliesQuery, PowerSuppliesQueryVariables>;
export const VideoCardsDocument = gql`
    query videoCards {
  videoCards {
    id
    name
    componentType
    price
    manufacturer
    partNumber
    model
    chipset
    memory
    memoryType
    coreClock
    interface
    color
    TDP
    coolingFans
    displayPortOutputs
    HDMIOutputs
  }
}
    `;

/**
 * __useVideoCardsQuery__
 *
 * To run a query within a React component, call `useVideoCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useVideoCardsQuery(baseOptions?: Apollo.QueryHookOptions<VideoCardsQuery, VideoCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoCardsQuery, VideoCardsQueryVariables>(VideoCardsDocument, options);
      }
export function useVideoCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoCardsQuery, VideoCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoCardsQuery, VideoCardsQueryVariables>(VideoCardsDocument, options);
        }
export function useVideoCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoCardsQuery, VideoCardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoCardsQuery, VideoCardsQueryVariables>(VideoCardsDocument, options);
        }
export type VideoCardsQueryHookResult = ReturnType<typeof useVideoCardsQuery>;
export type VideoCardsLazyQueryHookResult = ReturnType<typeof useVideoCardsLazyQuery>;
export type VideoCardsSuspenseQueryHookResult = ReturnType<typeof useVideoCardsSuspenseQuery>;
export type VideoCardsQueryResult = Apollo.QueryResult<VideoCardsQuery, VideoCardsQueryVariables>;