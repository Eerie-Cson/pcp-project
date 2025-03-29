import { setupFixture } from '../account-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as UserTokens } from '../../src/features/account/libs/tokens';
import { ObjectId } from '@pcp/object-id';

describe('Account.Update', () => {
  test('Update Account', async () => {
    const { module, request, teardown } = await setupFixture();

    const accountRepository = module.get<AccountRepository>(
      UserTokens.AccountRepository,
    );

    const account = generateAccount();
    await accountRepository.create(account);

    const updateInput = {
      name: generateAccount().name,
    };

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateAccountInput: UpdateAccountInput!
          ){
            updateAccount(id: $id, updateAccountInput: $updateAccountInput)
          }
      `,
      variables: {
        id: account.id.toString(),
        updateAccountInput: updateInput,
      },
    });

    const updatedAccount = await accountRepository.find(
      ObjectId.from(account.id.toString()),
    );

    await teardown();
    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateAccount).toBeTruthy();
    expect(updatedAccount.name).toEqual(updateInput.name);

    await teardown();
  });
});
