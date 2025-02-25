import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import path from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: [path.resolve(__dirname, '../src/**/*.gql')],
  path: path.resolve(__dirname, '../src/libs/graphql-types.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'Date',
    ObjectId: '_ObjectId',
    EmailAddress: 'string',
    JSON: 'Record<string, any>',
    URL: 'string',
  },
  additionalHeader: "import { ObjectId as _ObjectId } from '@pcp/object-id'",
  typeDefs: [constraintDirectiveTypeDefs],
});
