import { Module } from '@nestjs/common';
import { CaseResolver } from './resolvers/case.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentModule } from '../../features/component/component.module';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DateResolver, ObjectIDResolver } from 'graphql-scalars';
import path from 'path';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('COMPONENT_URI'),
      }),
      inject: [ConfigService],
    }),
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        const options: Omit<ApolloDriverConfig, 'driver'> = {
          csrfPrevention: false,
          playground: true,
          introspection: true,
          typePaths: [path.resolve(__dirname, './schema/*.gql')],
          resolvers: {
            ObjectId: ObjectIDResolver,
            Date: DateResolver,
          },
          typeDefs: [constraintDirectiveTypeDefs],
          context: ({ req, res }) => ({
            // user: req.user,
            // claims: req.claims,
            // permissions: req.permissions,
            // res,
          }),
          // transformSchema: async (schema: GraphQLSchema) => {
          //   let combinedSchemas = schema;
          //   const schemaTransformers = [
          //     {
          //       name: 'assertObjectType',
          //       fn: assertObjectTypeDirectiveSchemaTransformer,
          //     },
          //     {
          //       name: 'authorizationRequired',
          //       fn: authorizationRequiredDirectiveSchemaTransformer,
          //     },
          //   ];
          //   schemaTransformers.forEach((s) => {
          //     combinedSchemas = s.fn(combinedSchemas, s.name);
          //   });

          //   return combinedSchemas;
          // },
        };

        return options;
      },
    }),
    ComponentModule,
  ],
  providers: [CaseResolver],
})
export class ComponentsModule {}
