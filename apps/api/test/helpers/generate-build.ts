import { faker } from '@faker-js/faker/.';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { UserBuild } from '@pcp/types';

export function generateBuild(): UserBuild {
  return {
    user: ObjectId.generate(ObjectTypes.USER).toString(),
    components: { case: ObjectId.generate(ObjectTypes.CASE).toString() },
    // dateTimeCreated: faker.date.anytime(),
    // dateTimeUpdated: faker.date.anytime(),
    //datePublished: faker.date.anytime(),
    id: ObjectId.generate(ObjectTypes.BUILD),
    description: faker.lorem.sentence(),
    name: faker.commerce.productName(),
  };
}
