import { MongooseRepository, Repository } from '@pcp/repository';
import { VideoCard } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type VideoCardRepository = Repository<VideoCard>;

export function VideoCardRepositoryFactory(connection: Connection) {
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

    model: {
      type: String,
      required: true,
    },
    chipset: {
      type: String,
      required: true,
    },
    memory: {
      type: String,
      required: true,
    },
    memoryType: {
      type: String,
      required: true,
    },
    coreClock: {
      type: String,
      required: true,
    },
    interface: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    TDP: {
      type: String,
      required: true,
    },
    coolingFans: {
      type: String,
      required: true,
    },
    displayPortOutputs: {
      type: String,
      required: true,
    },
    HDMIOutputs: {
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

  return new MongooseRepository<VideoCard>(connection, 'VideoCard', schema);
}
