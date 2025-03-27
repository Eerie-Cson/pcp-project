import { MongooseRepository, Repository } from '@pcp/repository';
import { Session } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type SessionRepository = Repository<Session>;

export function SessionRepositoryFactory(
  connection: Connection,
): SessionRepository {
  const schema = new Schema({
    id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    jti: {
      type: Buffer,
      required: true,
    },
    dateTimeCreated: {
      type: Date,
      default: () => new Date(),
    },
    dateTimeUpdated: {
      type: Date,
      default: () => new Date(),
    },
  });

  return new MongooseRepository<Session>(connection, 'Session', schema);
}
