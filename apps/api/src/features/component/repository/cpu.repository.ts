import { Connection, Schema } from 'mongoose';
import { MongooseRepository, Repository } from '@pcp/repository';
import { Cpu } from '../../../libs/types/cpu';

export type CpuRepository = Repository<Cpu>;

export function CpuRepositoryFactory(connection: Connection) {
  const schema = new Schema({
    id: {
      type: String,
      required: true,
    },
    image: String,
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    partNumber: {
      type: String,
      required: true,
    },

    socket: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    microarchitecture: {
      type: String,
      required: true,
    },
    coreFamily: {
      type: String,
      required: true,
    },
    coreCount: {
      type: String,
      required: true,
    },
    coreClock: {
      type: String,
      required: true,
    },
    tdp: {
      type: String,
      required: true,
    },
    integratedGraphics: {
      type: String,
      required: true,
    },
    cooler: {
      type: String,
      required: true,
    },
    packaging: {
      type: String,
      required: true,
    },
    dateTimeCreated: {
      type: Date,
      default: () => new Date(),
    },
    dateTimeLastUpdated: {
      type: Date,
      default: () => new Date(),
    },
  });

  schema.index({ id: 1 }, { unique: true });

  return new MongooseRepository<Cpu>(connection, 'Cpu', schema);
}
