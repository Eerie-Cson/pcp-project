import { AccountType, User } from '@pcp/types';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { faker } from '@faker-js/faker';

export function generateUser(n?: number): User {
  return {
    id: ObjectId.generate(ObjectTypes.USER),
    username: faker.internet.username(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateTimeCreated: new Date(),
    dateTimeLastUpdated: new Date(),
    role: AccountType.Member,
  };
}
