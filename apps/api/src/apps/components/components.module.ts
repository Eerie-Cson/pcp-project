import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { DateResolver } from 'graphql-scalars';
import path from 'path';
import { ComponentModule } from '../../features/component/component.module';
import { CaseResolver } from './resolvers/case.resolver';
import { CpuResolver } from './resolvers/cpu.resolver';
import { MemoryResolver } from './resolvers/memory.resolver';
import { MotherboardResolver } from './resolvers/motherboard.resolver';
import { PowerSupplyResolver } from './resolvers/power-supply.resolver';
import { StorageResolver } from './resolvers/storage.resolver';
import { VideoCardResolver } from './resolvers/video-card.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('COMPONENTS_URI'),
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
          typePaths: [
            path.resolve(__dirname, './schema/components/schema/*.gql'),
            path.resolve(__dirname, './schema/*.gql'),
          ],
          resolvers: {
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
  providers: [
    CaseResolver,
    CpuResolver,
    MemoryResolver,
    VideoCardResolver,
    MotherboardResolver,
    PowerSupplyResolver,
    StorageResolver,
  ],
})
export class ComponentsModule {}
