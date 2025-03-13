import { setupFixture } from '../user-fixture';
import { generateUser } from '../helpers/generate-user';
import { UserRepository } from '../../src/features/user/repository/user.repository';
import { Tokens as UserTokens } from '../../src/features/user/libs/tokens';
import * as R from 'ramda';

describe('User.Query', () => {
  test('Get User', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const users = R.times(() => generateUser())(3);

    await Promise.all(users.map((user) => userRepository.create(user)));

    const user = users[0];

    const getUserResponse = await request.post('/graphql').send({
      query: `
          query($id: String!){
            user(id: $id){
              id
              name
              username
              email
            }
          }
      `,
      variables: {
        id: user.id.toString(),
      },
    });

    const getUsersResponse = await request.post('/graphql').send({
      query: `
          query{
            users{
              id
              name
              username
              email
            }
          }
      `,
    });

    await teardown();

    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body).not.toHaveProperty('errors');
    expect(getUserResponse.body.data.user).toBeTruthy();
    expect(getUserResponse.body.data.user).toMatchObject({
      id: user.id.toString(),
      username: user.username,
      name: user.name,
      email: user.email,
    });

    expect(getUsersResponse.status).toEqual(200);
    expect(getUsersResponse.body.data.users).toBeTruthy();
    expect(getUsersResponse.body).not.toHaveProperty('errors');
    expect(getUsersResponse.body.data.users).toHaveLength(3);

    await teardown();
  });
});
