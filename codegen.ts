import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    'apps/web/src/libs/graphql-types/accounts.ts': {
      schema: 'http://localhost:4001/graphql',
      documents: ['apps/web/src/graphql/user/**/*.ts'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    'apps/web/src/libs/graphql-types/component.ts': {
      schema: 'http://localhost:4002/graphql',
      documents: ['apps/web/src/graphql/component/**/*.ts'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
