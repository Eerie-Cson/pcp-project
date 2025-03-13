import { User } from '@pcp/types';
import * as R from 'ramda';
import { ObjectId } from '@pcp/object-id';
import { ObjectTypes } from '@pcp/object-type';
import { faker } from '@faker-js/faker';

export function generateUser(n?: number): User {
  return {
    id: ObjectId.generate(ObjectTypes.USER),
    username: faker.internet.username(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateTimeCreated: new Date(),
    dateTimeUpdated: new Date(),
  };
}
