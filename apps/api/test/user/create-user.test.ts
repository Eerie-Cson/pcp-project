import { setupFixture } from '../user-fixture';
import { generateUser } from '../helpers/generate-user';
import { UserRepository } from '../../src/features/user/repository/user.repository';
import { Tokens as UserTokens } from '../../src/features/user/libs/tokens';
import { AccountType } from '@pcp/types';

describe('User.Create', () => {
  test('create user', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const user = await generateUser();

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $username: String!
            $password: String!
            $name: String!
            $email: String!
            $role: Account!
          ) {
            createUser(createUserInput: {
              id: $id
              username: $username
              password: $password
              name: $name
              email: $email
              role: $role
            })
          }
        `,
      variables: {
        id: user.id.toString(),
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        role: AccountType.Member,
      },
    });

    const createdUser = await userRepository.find(user.id);

    await teardown();

    console.log(response.text);
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createUser).toBeTruthy();
    expect(createdUser).toMatchObject({
      id: user.id.toString(),
      username: user.username,
      name: user.name,
      email: user.email,
    });

    await teardown();
  });
});
