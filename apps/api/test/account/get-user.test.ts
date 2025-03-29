import { setupFixture } from '../account-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as AccountTokens } from '../../src/features/account/libs/tokens';
import * as R from 'ramda';

describe('Account.Query', () => {
  test('Get Account', async () => {
    const { module, request, teardown } = await setupFixture();

    const accountRepository = module.get<AccountRepository>(
      AccountTokens.AccountRepository,
    );

    const accounts = R.times(() => generateAccount())(3);

    await Promise.all(
      accounts.map((account) => accountRepository.create(account)),
    );

    const account = accounts[0];
    console.log(account.id.toString());

    const getUserResponse = await request.post('/graphql').send({
      query: `
          query($id: String!){
            account(id: $id){
              id
              name
              username
              email
            }
          }
      `,
      variables: {
        id: account.id.toString(),
      },
    });

    const getUsersResponse = await request.post('/graphql').send({
      query: `
          query{
            accounts{
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
    expect(getUserResponse.body.data.account).toBeTruthy();
    expect(getUserResponse.body.data.account).toMatchObject({
      id: account.id.toString(),
      username: account.username,
      name: account.name,
      email: account.email,
    });

    expect(getUsersResponse.status).toEqual(200);
    expect(getUsersResponse.body.data.accounts).toBeTruthy();
    expect(getUsersResponse.body).not.toHaveProperty('errors');
    expect(getUsersResponse.body.data.accounts).toHaveLength(3);

    await teardown();
  });
});
