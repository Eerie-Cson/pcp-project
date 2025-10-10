// GraphQL Query strings based on the provided documentation

export const GET_ACCOUNTS = `
  query GetAccounts {
    accounts {
      id
      name
      email
      createdAt
    }
  }
`

export const GET_ACCOUNT = `
  query GetAccount($id: String!) {
    account(id: $id) {
      id
      name
      email
      createdAt
    }
  }
`

export const GET_BUILDS = `
  query GetBuilds {
    getBuilds {
      id
      name
      status
      createdAt
      totalPrice
      estimatedWattage
    }
  }
`

export const GET_BUILD = `
  query GetBuild($id: ObjectId!) {
    getBuild(id: $id) {
      id
      name
      status
      details
      createdAt
      cpuId
      motherboardId
      memoryIds
      storageIds
      videoCardId
      caseId
      powerSupplyId
      totalPrice
      estimatedWattage
    }
  }
`

export const GET_CPUS = `
  query GetCPUs {
    CPUs {
      id
      name
      manufacturer
      socket
      cores
      threads
      baseClock
      boostClock
      tdp
      price
      imageUrl
    }
  }
`

export const GET_CPU = `
  query GetCPU($id: String!) {
    CPU(id: $id) {
      id
      name
      manufacturer
      socket
      cores
      threads
      baseClock
      boostClock
      tdp
      price
      imageUrl
    }
  }
`

export const GET_MOTHERBOARDS = `
  query GetMotherboards {
    motherboards {
      id
      name
      manufacturer
      socket
      formFactor
      chipset
      memoryType
      memorySlots
      maxMemory
      price
      imageUrl
    }
  }
`

export const GET_MOTHERBOARD = `
  query GetMotherboard($id: String!) {
    motherboard(id: $id) {
      id
      name
      manufacturer
      socket
      formFactor
      chipset
      memoryType
      memorySlots
      maxMemory
      price
      imageUrl
    }
  }
`

export const GET_MEMORY = `
  query GetMemory {
    memorys {
      id
      name
      manufacturer
      type
      speed
      capacity
      modules
      price
      imageUrl
    }
  }
`

export const GET_STORAGES = `
  query GetStorages {
    storages {
      id
      name
      manufacturer
      type
      capacity
      interface
      formFactor
      price
      imageUrl
    }
  }
`

export const GET_VIDEO_CARDS = `
  query GetVideoCards {
    videoCards {
      id
      name
      manufacturer
      chipset
      memory
      coreClock
      boostClock
      length
      tdp
      price
      imageUrl
    }
  }
`

export const GET_CASES = `
  query GetCases {
    cases {
      id
      name
      manufacturer
      type
      formFactor
      maxGpuLength
      price
      imageUrl
    }
  }
`

export const GET_POWER_SUPPLIES = `
  query GetPowerSupplies {
    powerSupplies {
      id
      name
      manufacturer
      wattage
      efficiency
      modular
      formFactor
      price
      imageUrl
    }
  }
`
