import { AccountType } from '../auth/auth';
import { Node } from '../node';
export type User = Node & {
  username: string;
  name: string;
  role: AccountType;
  email: string;
  password: string;
  dateTimeCreated: Date;
  dateTimeLastUpdated: Date;
};
