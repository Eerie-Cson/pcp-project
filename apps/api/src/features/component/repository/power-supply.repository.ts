import { Connection, Schema } from 'mongoose';
import { MongooseRepository, Repository } from '@pcp/repository';
import { PowerSupply } from '../../../libs/types/power-supply';

export type PowerSupplyRepository = Repository<PowerSupply>;

export function PowerSupplyRepositoryFactory(connection: Connection) {
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

    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    wattage: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fanless: {
      type: String,
      required: true,
    },
    SATAConnectors: {
      type: String,
      required: true,
    },
    length: {
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

  return new MongooseRepository<PowerSupply>(connection, 'PowerSupply', schema);
}
