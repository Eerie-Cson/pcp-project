import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../../features/user/user.module';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('USER_URI'),
      }),
      inject: [ConfigService],
    }),

    UserModule,
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
