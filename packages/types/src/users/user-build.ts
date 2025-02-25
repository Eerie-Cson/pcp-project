import { Node } from '../node';

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
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
};
