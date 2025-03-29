import { setupFixture } from '../account-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as AccountTokens } from '../../src/features/account/libs/tokens';
import { AccountType } from '@pcp/types';

describe('Account.Create', () => {
  test('create account', async () => {
    const { module, request, teardown } = await setupFixture();

    const accountRepository = module.get<AccountRepository>(
      AccountTokens.AccountRepository,
    );

    const account = await generateAccount();

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $username: String!
            $password: String!
            $name: String!
            $email: String!
            $role: AccountType!
          ) {
            createAccount(createAccountInput: {
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
        id: account.id.toString(),
        username: account.username,
        password: account.password,
        name: account.name,
        email: account.email,
        role: AccountType.MEMBER,
      },
    });

    const createdUser = await accountRepository.find(account.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createAccount).toBeTruthy();
    expect(createdUser).toMatchObject({
      id: account.id.toString(),
      username: account.username,
      name: account.name,
      email: account.email,
    });

    await teardown();
  });
});
