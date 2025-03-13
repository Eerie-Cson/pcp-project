import { setupFixture } from '../user-fixture';
import { generateUser } from '../helpers/generate-user';
import { UserRepository } from '../../src/features/user/repository/user.repository';
import { Tokens as UserTokens } from '../../src/features/user/libs/tokens';
import { ObjectId } from '@pcp/object-id';
import { User } from '@pcp/types';

describe('User.Delete', () => {
  test('Delete User', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const user = generateUser();
    await userRepository.create(user);

    const response = await request.post('/graphql').send({
      query: `
          mutation($id: String!){
            deleteUser(id: $id)
          }
      `,
      variables: {
        id: user.id.toString(),
      },
    });

    const deletedUser = (await userRepository.find(
      ObjectId.from(user.id.toString()),
    )) as User;

    await teardown();

    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteUser).toBeTruthy();
    expect(deletedUser).toBeNull();

    await teardown();
  });
});
