import { MongooseRepository, Repository } from '@pcp/repository';
import { Motherboard } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type MotherboardRepository = Repository<Motherboard>;

export function MotherboardRepositoryFactory(connection: Connection) {
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

    socket: {
      type: String,
      required: true,
    },
    formFactor: {
      type: String,
      required: true,
    },
    chipset: {
      type: String,
      required: true,
    },
    memoryMax: {
      type: String,
      required: true,
    },
    memoryType: {
      type: String,
      required: true,
    },
    memorySlots: {
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

  return new MongooseRepository<Motherboard>(connection, 'Motherboard', schema);
}
