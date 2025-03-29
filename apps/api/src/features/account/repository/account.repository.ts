import { MongooseRepository, Repository } from '@pcp/repository';
import { Account } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type AccountRepository = Repository<Account>;

export function AccountRepositoryFactory(
  connection: Connection,
): AccountRepository {
  const schema = new Schema({
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
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

  return new MongooseRepository<Account>(connection, 'Account', schema);
}
