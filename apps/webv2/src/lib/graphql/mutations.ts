// GraphQL Mutation strings based on the provided documentation

// Account Mutations
export const CREATE_ACCOUNT = `
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput)
  }
`

export const UPDATE_ACCOUNT = `
  mutation UpdateAccount($id: String!, $updateAccountInput: UpdateAccountInput!) {
    updateAccount(id: $id, updateAccountInput: $updateAccountInput)
  }
`

export const DELETE_ACCOUNT = `
  mutation DeleteAccount($id: String!) {
    deleteAccount(id: $id)
  }
`

// Build Mutations
export const CREATE_BUILD = `
  mutation CreateBuild($createBuildInput: CreateBuildInput!) {
    createBuild(createBuildInput: $createBuildInput)
  }
`

export const UPDATE_BUILD = `
  mutation UpdateBuild($id: ObjectId!, $updateBuildInput: UpdateBuildInput!) {
    updateBuild(id: $id, updateBuildInput: $updateBuildInput)
  }
`

export const DELETE_BUILD = `
  mutation DeleteBuild($id: ObjectId!) {
    deleteBuild(id: $id)
  }
`

// CPU Mutations
export const CREATE_CPU = `
  mutation CreateCPU($createCPUInput: CreateCPUInput!) {
    createCPU(createCPUInput: $createCPUInput)
  }
`

export const UPDATE_CPU = `
  mutation UpdateCPU($id: String!, $updateCPUInput: UpdateCPUInput!) {
    updateCPU(id: $id, updateCPUInput: $updateCPUInput)
  }
`

export const DELETE_CPU = `
  mutation DeleteCPU($id: String!) {
    deleteCPU(id: $id)
  }
`

// Motherboard Mutations
export const CREATE_MOTHERBOARD = `
  mutation CreateMotherboard($createMotherboardInput: CreateMotherboardInput!) {
    createMotherboard(createMotherboardInput: $createMotherboardInput)
  }
`

export const UPDATE_MOTHERBOARD = `
  mutation UpdateMotherboard($id: String!, $updateMotherboardInput: UpdateMotherboardInput!) {
    updateMotherboard(id: $id, updateMotherboardInput: $updateMotherboardInput)
  }
`

export const DELETE_MOTHERBOARD = `
  mutation DeleteMotherboard($id: String!) {
    deleteMotherboard(id: $id)
  }
`

// Memory Mutations
export const CREATE_MEMORY = `
  mutation CreateMemory($createMemoryInput: CreateMemoryInput!) {
    createMemory(createMemoryInput: $createMemoryInput)
  }
`

export const UPDATE_MEMORY = `
  mutation UpdateMemory($id: String!, $updateMemoryInput: UpdateMemoryInput!) {
    updateMemory(id: $id, updateMemoryInput: $updateMemoryInput)
  }
`

export const DELETE_MEMORY = `
  mutation DeleteMemory($id: String!) {
    deleteMemory(id: $id)
  }
`

// Storage Mutations
export const CREATE_STORAGE = `
  mutation CreateStorage($createStorageInput: CreateStorageInput!) {
    createStorage(createStorageInput: $createStorageInput)
  }
`

export const UPDATE_STORAGE = `
  mutation UpdateStorage($id: String!, $updateStorageInput: UpdateStorageInput!) {
    updateStorage(id: $id, updateStorageInput: $updateStorageInput)
  }
`

export const DELETE_STORAGE = `
  mutation DeleteStorage($id: String!) {
    deleteStorage(id: $id)
  }
`

// Video Card Mutations
export const CREATE_VIDEO_CARD = `
  mutation CreateVideoCard($createVideoCardInput: CreateVideoCardInput!) {
    createVideoCard(createVideoCardInput: $createVideoCardInput)
  }
`

export const UPDATE_VIDEO_CARD = `
  mutation UpdateVideoCard($id: String!, $updateVideoCardInput: UpdateVideoCardInput!) {
    updateVideoCard(id: $id, updateVideoCardInput: $updateVideoCardInput)
  }
`

export const DELETE_VIDEO_CARD = `
  mutation DeleteVideoCard($id: String!) {
    deleteVideoCard(id: $id)
  }
`

// Case Mutations
export const CREATE_CASE = `
  mutation CreateCase($createCaseInput: CreateCaseInput!) {
    createCase(createCaseInput: $createCaseInput)
  }
`

export const UPDATE_CASE = `
  mutation UpdateCase($id: String!, $updateCaseInput: UpdateCaseInput!) {
    updateCase(id: $id, updateCaseInput: $updateCaseInput)
  }
`

export const DELETE_CASE = `
  mutation DeleteCase($id: String!) {
    deleteCase(id: $id)
  }
`

// Power Supply Mutations
export const CREATE_POWER_SUPPLY = `
  mutation CreatePowerSupply($createPowerSupplyInput: CreatePowerSupplyInput!) {
    createPowerSupply(createPowerSupplyInput: $createPowerSupplyInput)
  }
`

export const UPDATE_POWER_SUPPLY = `
  mutation UpdatePowerSupply($id: String!, $updatePowerSupplyInput: UpdatePowerSupplyInput!) {
    updatePowerSupply(id: $id, updatePowerSupplyInput: $updatePowerSupplyInput)
  }
`

export const DELETE_POWER_SUPPLY = `
  mutation DeletePowerSupply($id: String!) {
    deletePowerSupply(id: $id)
  }
`
