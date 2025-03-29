import { setupFixture } from '../account-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as AccountTokens } from '../../src/features/account/libs/tokens';
import { ObjectId } from '@pcp/object-id';

describe('Account.Delete', () => {
  test('Delete Account', async () => {
    const { module, request, teardown } = await setupFixture();

    const accountRepository = module.get<AccountRepository>(
      AccountTokens.AccountRepository,
    );

    const account = generateAccount();
    await accountRepository.create(account);

    const response = await request.post('/graphql').send({
      query: `
          mutation($id: String!){
            deleteAccount(id: $id)
          }
      `,
      variables: {
        id: account.id.toString(),
      },
    });

    const deletedUser = await accountRepository.find(
      ObjectId.from(account.id.toString()),
    );

    await teardown();

    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteAccount).toBeTruthy();
    expect(deletedUser).toBeNull();

    await teardown();
  });
});
