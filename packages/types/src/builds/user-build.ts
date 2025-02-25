import { Node } from '../node';
import { ObjectId } from '@pcp/object-id';

export type Components = {
  cpu?: ObjectId;
  motherboard?: ObjectId;
  memory?: ObjectId;
  storage?: ObjectId;
  videoCard?: ObjectId;
  powerSupply?: ObjectId;
  case?: ObjectId;
};
export type UserBuild = Node & {
  user: ObjectId;
  components: Components;
  description: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  datePublished?: Date;
};
