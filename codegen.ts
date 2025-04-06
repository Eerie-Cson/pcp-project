import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // Prevents errors if some directories have no GraphQL operations
  generates: {
    'apps/web/src/types/accounts/graphql.ts': {
      schema: 'http://localhost:4001/graphql',
      documents: ['apps/web/src/graphql/user/**/*.ts'], // User docs use Accounts schema
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    'apps/web/src/types/components/graphql.ts': {
      schema: 'http://localhost:4002/graphql',
      documents: ['apps/web/src/graphql/component/**/*.ts'], // Component docs use Components schema
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
