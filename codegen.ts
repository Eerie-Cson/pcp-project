import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4001/graphql', // Change this actual API URL
  documents: 'apps/web/src/**/*.{ts,tsx}',
  generates: {
    'apps/web/src/types/graphql.ts': {
      schema: './apps/web/src/types/graphql.ts',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
