import { Inject, Injectable } from '@nestjs/common';
import { Tokens } from './libs/tokens';
import { CaseRepository } from './repository/case.repository';
import { CpuRepository } from './repository/cpu.repository';
import { MemoryRepository } from './repository/memory.repository';
import { MotherboardRepository } from './repository/motherboard.repository';
import { PowerSupplyRepository } from './repository/power-supply.repository';
import { StorageRepository } from './repository/storage.repository';
import { VideoCardRepository } from './repository/video-card.repository';
import { Case } from '../../libs/types/case';
import { Cpu } from '../../libs/types/cpu';
import { Memory } from '../../libs/types/memory';
import { Motherboard } from '../../libs/types/motherboard';
import { PowerSupply } from '../../libs/types/power-supply';
import { VideoCard } from '../../libs/types/video-card';
import { Storage } from '../../libs/types/storage';

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
    private videoCardRepository: VideoCardRepository
  ) {}
  async createCase(data: Case) {
    return this.caseRepository.create(data);
  }

  async updateCase(params: { id: string; data: Partial<Omit<Case, 'id'>> }) {
    return this.caseRepository.update(
      {
        id: params.id,
      },
      params.data
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

  async createCpu(data: Cpu) {
    return this.cpuRepository.create(data);
  }

  async updateCpu(params: { id: string; data: Partial<Omit<Cpu, 'id'>> }) {
    return this.cpuRepository.update(
      {
        id: params.id,
      },
      params.data
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

  async createMemory(data: Memory) {
    return this.memoryRepository.create(data);
  }

  async updateMemory(params: {
    id: string;
    data: Partial<Omit<Memory, 'id'>>;
  }) {
    return this.memoryRepository.update(
      {
        id: params.id,
      },
      params.data
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

  async createMotherboard(data: Motherboard) {
    return this.motherboardRepository.create(data);
  }

  async updateMotherboard(params: {
    id: string;
    data: Partial<Omit<Motherboard, 'id'>>;
  }) {
    return this.motherboardRepository.update(
      {
        id: params.id,
      },
      params.data
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

  async createPowerSupply(data: PowerSupply) {
    return this.powerSupplyRepository.create(data);
  }

  async updatePowerSupply(params: {
    id: string;
    data: Partial<Omit<PowerSupply, 'id'>>;
  }) {
    return this.powerSupplyRepository.update(
      {
        id: params.id,
      },
      params.data
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

  async createStorage(data: Storage) {
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
      params.data
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

  async createVideoCard(data: VideoCard) {
    return this.videoCardRepository.create(data);
  }

  async updateVideoCard(params: {
    id: string;
    data: Partial<Omit<VideoCard, 'id'>>;
  }) {
    return this.videoCardRepository.update(
      {
        id: params.id,
      },
      params.data
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
}
