import { ObjectId } from '@highoutputventures/opexa-object-id';

export type Node = {
  id: ObjectId;
};

export enum Currency {
  PHP = 'PHP',
  USD = 'USD',
}

export enum Language {
  English = 'en',
}
