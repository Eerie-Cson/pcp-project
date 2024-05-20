import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import path from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: [path.resolve(__dirname, '../apps/**/*.gql')],
  path: path.resolve(__dirname, '../libs/graphql-types.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    Date: 'Date',
    ObjectId: '_ObjectId',
  },
  additionalHeader: "import { ObjectId as _ObjectId } from '@pcp/object-id'",
  typeDefs: [constraintDirectiveTypeDefs],
});
