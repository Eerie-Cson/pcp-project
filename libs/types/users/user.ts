import { ObjectId } from '@pcp/object-id';

export type User = {
  id: ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  dateTimeCreated: Date;
  dateTimeUpddated: Date;
};
