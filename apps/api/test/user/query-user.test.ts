import { setupFixture } from '../user-fixture';
import { generateUser } from '../helpers/generate-user';
import { UserRepository } from '../../src/features/user/repository/user.repository';
import { Tokens as UserTokens } from '../../src/features/user/libs/tokens';
import * as R from 'ramda';

describe('User', () => {
  test('query user', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const users = R.times(() => generateUser(), 10);
    const n = Math.floor(Math.random() * 10);
    const user = users[n];

    await Promise.all(users.map((user) => userRepository.create(user)));

    const response = await request.post('/graphql').send({
      query: `
          query(
            $id: String!
          ) {
            user(id: $id) {
              id
              username
              name
              email
              dateTimeCreated
              dateTimeLastUpdated
            }
          }
        `,
      variables: {
        id: user.id.toString(),
      },
    });

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.user).toMatchObject({
      id: user.id.toString(),
      username: user.username,
      name: user.name,
      email: user.email,
    });

    await teardown();
  });

  test('query users', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const users = R.times(() => generateUser(), 10);

    await Promise.all(users.map((user) => userRepository.create(user)));

    const response = await request.post('/graphql').send({
      query: `
          query {
            users {
              id
              username
              name
              email
              dateTimeCreated
              dateTimeLastUpdated
            }
          }
        `,
      variables: {},
    });

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.users).toHaveLength(10);

    await teardown();
  });
});
