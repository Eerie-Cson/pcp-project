import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '../../features/account/account.module';
import { AccountsResolver } from './resolvers/accounts.resolver';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  DateTimeResolver,
  EmailAddressResolver,
  JSONResolver,
  URLResolver,
  TimeZoneResolver,
  DateResolver,
} from 'graphql-scalars';
import path from 'path';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { AuthMiddleware } from '@pcp/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('ACCOUNTS_URI'),
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
          typePaths: [path.resolve(__dirname, './schema/accounts/schema/*.gql')],
          resolvers: {
            JSON: JSONResolver,
            Date: DateResolver,
            DateTime: DateTimeResolver,
            EmailAddress: EmailAddressResolver,
            URL: URLResolver,
            // ObjectId: ObjectIdResolver,
            // Cursor: CursorResolver,
            // Decimal: DecimalResolver,
            Timezone: TimeZoneResolver,
          },
          typeDefs: [constraintDirectiveTypeDefs],
          context: ({ req, res }) => ({
            user: req.user,
            claims: req.claims,
            permissions: req.permissions,
            res,
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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const secret = await config.get('JWT_SECRET_KEY');
        return {
          secret,
        };
      },
    }),
    AccountModule,
  ],
  providers: [AccountsResolver],
})
export class AccountsModule 
  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
