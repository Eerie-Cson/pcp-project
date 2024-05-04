import { MongooseRepository, Repository } from '@pcp/repository';
import { User } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type UserRepository = Repository<User>;

export function UserRepositoryFactory(connection: Connection): UserRepository {
  const schema = new Schema({
    id: {
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

  return new MongooseRepository<User>(connection, 'User', schema);
}
