import { MongooseRepository, Repository } from '@pcp/repository';
import { UserBuild } from '@pcp/types';
import { Connection, Schema } from 'mongoose';

export type UserBuildRepository = Repository<UserBuild>;

export function UserBuildRepositoryFactory(
  connection: Connection
): UserBuildRepository {
  const schema = new Schema({
    user: {
      type: String,
      required: true,
    },
    components: {
      type: Schema.Types.Mixed,
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
    datePublished: {
      type: Date,
      default: () => new Date(),
    },
  });

  return new MongooseRepository<UserBuild>(connection, 'UserBuild', schema);
}
