import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from '@pcp/object-id';
import {
  Case,
  Component,
  ComponentType,
  Cpu,
  Memory,
  Motherboard,
  PowerSupply,
  Storage,
  VideoCard,
} from '@pcp/types';
import { Tokens } from './libs/tokens';
import { CaseRepository } from './repository/case.repository';
import { CpuRepository } from './repository/cpu.repository';
import { MemoryRepository } from './repository/memory.repository';
import { MotherboardRepository } from './repository/motherboard.repository';
import { PowerSupplyRepository } from './repository/power-supply.repository';
import { StorageRepository } from './repository/storage.repository';
import { VideoCardRepository } from './repository/video-card.repository';

@Injectable()
export class ComponentService {
  constructor(
    @Inject(Tokens.CaseRepository)
    private caseRepository: CaseRepository,
    @Inject(Tokens.CpuRepository)
    private cpuRepository: CpuRepository,
    @Inject(Tokens.MemoryRepository)
    private memoryRepository: MemoryRepository,
    @Inject(Tokens.MotherboardRepository)
    private motherboardRepository: MotherboardRepository,
    @Inject(Tokens.PowerSupplyRepository)
    private powerSupplyRepository: PowerSupplyRepository,
    @Inject(Tokens.StorageRepository)
    private storageRepository: StorageRepository,
    @Inject(Tokens.VideoCardRepository)
    private videoCardRepository: VideoCardRepository,
  ) {}
  async createCase(data: Component) {
    if (data.componentType === ComponentType.CASE) {
      return this.caseRepository.create(data);
    }
  }

  async updateCase(params: { id: ObjectId; data: Partial<Omit<Case, 'id'>> }) {
    return this.caseRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteCase(id: string) {
    return this.caseRepository.delete({
      id,
    });
  }

  async findCase(params: Partial<Case>) {
    return this.caseRepository.find(params);
  }

  async findCases(params: Partial<Case>) {
    return this.caseRepository.list(params);
  }

  async createCpu(data: Component) {
    if (data.componentType === ComponentType.CPU) {
      return this.cpuRepository.create(data);
    }
  }

  async updateCpu(params: { id: string; data: Partial<Omit<Cpu, 'id'>> }) {
    return this.cpuRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteCpu(id: string) {
    return this.cpuRepository.delete({
      id,
    });
  }

  async findCpu(params: Partial<Cpu>) {
    return this.cpuRepository.find(params);
  }

  async findCpus(params: Partial<Cpu>) {
    return this.cpuRepository.list(params);
  }

  async createMemory(data: Component) {
    if (data.componentType === ComponentType.MEMORY) {
      return this.memoryRepository.create(data);
    }
  }

  async updateMemory(params: {
    id: string;
    data: Partial<Omit<Memory, 'id'>>;
  }) {
    return this.memoryRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteMemory(id: string) {
    return this.memoryRepository.delete({
      id,
    });
  }

  async findMemory(params: Partial<Memory>) {
    return this.memoryRepository.find(params);
  }

  async findMemorys(params: Partial<Memory>) {
    return this.memoryRepository.list(params);
  }

  async createMotherboard(data: Component) {
    if (data.componentType === ComponentType.MOTHERBOARD) {
      return this.motherboardRepository.create(data);
    }
  }

  async updateMotherboard(params: {
    id: string;
    data: Partial<Omit<Motherboard, 'id'>>;
  }) {
    return this.motherboardRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteMotherboard(id: string) {
    return this.motherboardRepository.delete({
      id,
    });
  }

  async findMotherboard(params: Partial<Motherboard>) {
    return this.motherboardRepository.find(params);
  }

  async findMotherboards(params: Partial<Motherboard>) {
    return this.motherboardRepository.list(params);
  }

  async createPowerSupply(data: Component) {
    if (data.componentType === ComponentType.POWER_SUPPLY) {
      return this.powerSupplyRepository.create(data);
    }
  }

  async updatePowerSupply(params: {
    id: string;
    data: Partial<Omit<PowerSupply, 'id'>>;
  }) {
    return this.powerSupplyRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deletePowerSupply(id: string) {
    return this.powerSupplyRepository.delete({
      id,
    });
  }

  async findPowerSupply(params: Partial<PowerSupply>) {
    return this.powerSupplyRepository.find(params);
  }

  async findPowerSupplies(params: Partial<PowerSupply>) {
    return this.powerSupplyRepository.list(params);
  }

  async createStorage(data: Component) {
    if (data.componentType === ComponentType.STORAGE)
      return this.storageRepository.create(data);
  }

  async updateStorage(params: {
    id: string;
    data: Partial<Omit<Storage, 'id'>>;
  }) {
    return this.storageRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteStorage(id: string) {
    return this.storageRepository.delete({
      id,
    });
  }

  async findStorage(params: Partial<Storage>) {
    return this.storageRepository.find(params);
  }

  async findStorages(params: Partial<Storage>) {
    return this.storageRepository.list(params);
  }

  async createVideoCard(data: Component) {
    if (data.componentType === ComponentType.VIDEO_CARD) {
      return this.videoCardRepository.create(data);
    }
  }

  async updateVideoCard(params: {
    id: string;
    data: Partial<Omit<VideoCard, 'id'>>;
  }) {
    return this.videoCardRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteVideoCard(id: string) {
    return this.videoCardRepository.delete({
      id,
    });
  }

  async findVideoCard(params: Partial<VideoCard>) {
    return this.videoCardRepository.find(params);
  }
  async findVideoCards(params: Partial<VideoCard>) {
    return this.videoCardRepository.list(params);
  }
}
