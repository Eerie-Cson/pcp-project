import { setupFixture } from '../build-fixture';
import { generateBuild } from '../helpers/generate-build';
import { UserBuildRepository } from '../../src/features/build/repository/user-build.repository';
import { Tokens as BuildTokens } from '../../src/features/build/libs/tokens';

describe('Build.Create', () => {
  test('Create Build', async () => {
    const { module, request, teardown } = await setupFixture();

    const userBuildRepository = module.get<UserBuildRepository>(
      BuildTokens.UserBuildRepository,
    );

    const build = generateBuild();

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createBuildInput: CreateBuildInput!
          ) {
            createBuild(createBuildInput: $createBuildInput)
          }
      `,
      variables: {
        createBuildInput: {
          ...build,
          id: build.id.toString(),
        },
      },
    });

    const createdBuild = await userBuildRepository.find(build.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createBuild).toBeTruthy();
    expect(createdBuild).toMatchObject({
      id: build.id,
      name: build.name,
      description: build.description,
      components: build.components,
    });

    await teardown();
  });
});
