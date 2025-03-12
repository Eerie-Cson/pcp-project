import { Connection, Schema } from 'mongoose';
import { MongooseRepository, Repository } from '@pcp/repository';
import { Case } from '@pcp/types';

export type CaseRepository = Repository<Case>;

export function CaseRepositoryFactory(connection: Connection) {
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
    componentType: {
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
    type: {
      type: String,
      required: true,
    },
    color: {
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
    powerSupply: {
      type: String,
      required: true,
    },
    sidePanel: {
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

  return new MongooseRepository<Case>(connection, 'Case', schema);
}
