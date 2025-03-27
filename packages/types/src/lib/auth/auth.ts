import { ObjectId } from '@pcp/object-id';
import { Node } from '../node';

export enum AccountType {
  SuperAdmin = 'SUPER_ADMIN',
  Member = 'MEMBER',
}

export type Session = Node & {
  user: ObjectId;
  jti: Buffer;
  dateTimeCreated: Date;
  dateTimeLastRefreshed: Date;
};
