import { Connection, Schema } from 'mongoose';
import { MongooseRepository, Repository } from '@pcp/repository';
import { Storage } from '@pcp/types';

export type StorageRepository = Repository<Storage>;

export function StorageRepositoryFactory(connection: Connection) {
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

    capacity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    formFactor: {
      type: String,
      required: true,
    },
    interface: {
      type: String,
      required: true,
    },
    NVME: {
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

  return new MongooseRepository<Storage>(connection, 'Storage', schema);
}
