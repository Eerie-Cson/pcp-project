// GraphQL Schema Types based on the provided documentation

export type ObjectId = string

// Account Types
export interface Account {
  id: string
  name: string
  email: string
  createdAt?: string
  role?: "admin" | "user"
}

export interface CreateAccountInput {
  name: string
  email: string
  password: string
  role?: "admin" | "user"
}

export interface UpdateAccountInput {
  name?: string
  email?: string
  password?: string
  role?: "admin" | "user"
}

// Build Types
export interface Build {
  id: ObjectId
  name: string
  status: string
  details?: string
  createdAt?: string
  accountId?: string
  cpuId?: string
  motherboardId?: string
  memoryIds?: string[]
  storageIds?: string[]
  videoCardId?: string
  caseId?: string
  powerSupplyId?: string
  totalPrice?: number
  estimatedWattage?: number
}

export interface CreateBuildInput {
  name: string
  status?: string
  details?: string
  accountId?: string
  cpuId?: string
  motherboardId?: string
  memoryIds?: string[]
  storageIds?: string[]
  videoCardId?: string
  caseId?: string
  powerSupplyId?: string
}

export interface UpdateBuildInput {
  name?: string
  status?: string
  details?: string
  cpuId?: string
  motherboardId?: string
  memoryIds?: string[]
  storageIds?: string[]
  videoCardId?: string
  caseId?: string
  powerSupplyId?: string
}

// CPU Types
export interface CPU {
  id: string
  name: string
  manufacturer: string
  socket: string
  cores: number
  threads: number
  baseClock: number
  boostClock?: number
  tdp: number
  price: number
  imageUrl?: string
}

export interface CreateCPUInput {
  name: string
  manufacturer: string
  socket: string
  cores: number
  threads: number
  baseClock: number
  boostClock?: number
  tdp: number
  price: number
  imageUrl?: string
}

export interface UpdateCPUInput {
  name?: string
  manufacturer?: string
  socket?: string
  cores?: number
  threads?: number
  baseClock?: number
  boostClock?: number
  tdp?: number
  price?: number
  imageUrl?: string
}

// Motherboard Types
export interface Motherboard {
  id: string
  name: string
  manufacturer: string
  socket: string
  formFactor: string
  chipset: string
  memoryType: string
  memorySlots: number
  maxMemory: number
  price: number
  imageUrl?: string
}

export interface CreateMotherboardInput {
  name: string
  manufacturer: string
  socket: string
  formFactor: string
  chipset: string
  memoryType: string
  memorySlots: number
  maxMemory: number
  price: number
  imageUrl?: string
}

export interface UpdateMotherboardInput {
  name?: string
  manufacturer?: string
  socket?: string
  formFactor?: string
  chipset?: string
  memoryType?: string
  memorySlots?: number
  maxMemory?: number
  price?: number
  imageUrl?: string
}

// Memory Types
export interface Memory {
  id: string
  name: string
  manufacturer: string
  type: string
  speed: number
  capacity: number
  modules: number
  price: number
  imageUrl?: string
}

export interface CreateMemoryInput {
  name: string
  manufacturer: string
  type: string
  speed: number
  capacity: number
  modules: number
  price: number
  imageUrl?: string
}

export interface UpdateMemoryInput {
  name?: string
  manufacturer?: string
  type?: string
  speed?: number
  capacity?: number
  modules?: number
  price?: number
  imageUrl?: string
}

// Storage Types
export interface Storage {
  id: string
  name: string
  manufacturer: string
  type: string
  capacity: number
  interface: string
  formFactor: string
  price: number
  imageUrl?: string
}

export interface CreateStorageInput {
  name: string
  manufacturer: string
  type: string
  capacity: number
  interface: string
  formFactor: string
  price: number
  imageUrl?: string
}

export interface UpdateStorageInput {
  name?: string
  manufacturer?: string
  type?: string
  capacity?: number
  interface?: string
  formFactor?: string
  price?: number
  imageUrl?: string
}

// Video Card Types
export interface VideoCard {
  id: string
  name: string
  manufacturer: string
  chipset: string
  memory: number
  coreClock: number
  boostClock?: number
  length: number
  tdp: number
  price: number
  imageUrl?: string
}

export interface CreateVideoCardInput {
  name: string
  manufacturer: string
  chipset: string
  memory: number
  coreClock: number
  boostClock?: number
  length: number
  tdp: number
  price: number
  imageUrl?: string
}

export interface UpdateVideoCardInput {
  name?: string
  manufacturer?: string
  chipset?: string
  memory?: number
  coreClock?: number
  boostClock?: number
  length?: number
  tdp?: number
  price?: number
  imageUrl?: string
}

// Case Types
export interface Case {
  id: string
  name: string
  manufacturer: string
  type: string
  formFactor: string[]
  maxGpuLength: number
  price: number
  imageUrl?: string
}

export interface CreateCaseInput {
  name: string
  manufacturer: string
  type: string
  formFactor: string[]
  maxGpuLength: number
  price: number
  imageUrl?: string
}

export interface UpdateCaseInput {
  name?: string
  manufacturer?: string
  type?: string
  formFactor?: string[]
  maxGpuLength?: number
  price?: number
  imageUrl?: string
}

// Power Supply Types
export interface PowerSupply {
  id: string
  name: string
  manufacturer: string
  wattage: number
  efficiency: string
  modular: string
  formFactor: string
  price: number
  imageUrl?: string
}

export interface CreatePowerSupplyInput {
  name: string
  manufacturer: string
  wattage: number
  efficiency: string
  modular: string
  formFactor: string
  price: number
  imageUrl?: string
}

export interface UpdatePowerSupplyInput {
  name?: string
  manufacturer?: string
  wattage?: number
  efficiency?: string
  modular?: string
  formFactor?: string
  price?: number
  imageUrl?: string
}
