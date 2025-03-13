import { setupFixture } from '../user-fixture';
import { generateUser } from '../helpers/generate-user';
import { UserRepository } from '../../src/features/user/repository/user.repository';
import { Tokens as UserTokens } from '../../src/features/user/libs/tokens';
import { ObjectId } from '@pcp/object-id';
import { User } from '@pcp/types';

describe('User.Update', () => {
  test('Update User', async () => {
    const { module, request, teardown } = await setupFixture();

    const userRepository = module.get<UserRepository>(
      UserTokens.UserRepository,
    );

    const user = generateUser();
    await userRepository.create(user);

    const updateInput = {
      name: generateUser().name,
    };

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateUserInput: UpdateUserInput!
          ){
            updateUser(id: $id, updateUserInput: $updateUserInput)
          }
      `,
      variables: {
        id: user.id.toString(),
        updateUserInput: updateInput,
      },
    });

    //TODO: Remove as
    const updatedUser = (await userRepository.find(
      ObjectId.from(user.id.toString()),
    )) as User;

    await teardown();
    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateUser).toBeTruthy();
    expect(updatedUser.name).toEqual(updateInput.name);

    await teardown();
  });
});
