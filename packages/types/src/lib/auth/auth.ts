import { ObjectId } from '@pcp/object-id';
import { Node } from '../node';

export enum AccountType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MEMBER = 'MEMBER',
}

export type Session = Node & {
  user: ObjectId;
  jti: Buffer;
  dateTimeCreated: Date;
  dateTimeLastRefreshed: Date;
};
