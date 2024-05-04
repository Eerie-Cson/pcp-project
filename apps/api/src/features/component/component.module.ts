import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ComponentService } from './component.service';
import { Tokens } from './libs/tokens';
import { CaseRepositoryFactory } from './repository/case.repository';
import { CpuRepositoryFactory } from './repository/cpu.repository';
import { MemoryRepositoryFactory } from './repository/memory.repository';
import { MotherboardRepositoryFactory } from './repository/motherboard.repository';
import { PowerSupplyRepositoryFactory } from './repository/power-supply.repository';
import { StorageRepositoryFactory } from './repository/storage.repository';
import { VideoCardRepositoryFactory } from './repository/video-card.repository';

@Module({
  providers: [
    {
      provide: Tokens.CaseRepository,
      useFactory: CaseRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.CpuRepository,
      useFactory: CpuRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.MemoryRepository,
      useFactory: MemoryRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.MotherboardRepository,
      useFactory: MotherboardRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.PowerSupplyRepository,
      useFactory: PowerSupplyRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.StorageRepository,
      useFactory: StorageRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.VideoCardRepository,
      useFactory: VideoCardRepositoryFactory,
      inject: [getConnectionToken()],
    },
    ComponentService,
  ],
  exports: [ComponentService],
})
export class ComponentModule {}
