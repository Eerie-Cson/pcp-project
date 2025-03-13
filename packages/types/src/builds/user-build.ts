import { Node } from '../node';
//import { ObjectId } from '@pcp/object-id';

export type Components = {
  cpu?: string;
  motherboard?: string;
  memory?: string;
  storage?: string;
  videoCard?: string;
  powerSupply?: string;
  case?: string;
};
export type UserBuild = Node & {
  user: string;
  name: string;
  components: Components;
  description?: string;
  dateTimeCreated?: Date;
  dateTimeUpdated?: Date;
  datePublished?: Date;
};
