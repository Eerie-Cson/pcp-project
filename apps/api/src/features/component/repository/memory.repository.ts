import { Connection, Schema } from 'mongoose';
import { MongooseRepository, Repository } from '@pcp/repository';
import { Memory } from '@pcp/types';

export type MemoryRepository = Repository<Memory>;

export function MemoryRepositoryFactory(connection: Connection) {
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

    componentType: {
      type: String,
      required: true,
    },

    speed: {
      type: String,
      required: true,
    },
    formFactor: {
      type: String,
      required: true,
    },
    modules: {
      type: String,
      required: true,
    },
    voltage: {
      type: String,
      required: true,
    },
    heatSpreader: {
      type: String,
      required: true,
    },
    color: {
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

  return new MongooseRepository<Memory>(connection, 'Memory', schema);
}
