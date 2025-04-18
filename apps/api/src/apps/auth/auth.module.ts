import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { SessionController } from './session.controller';
import { SessionModule } from '../../features/auth/session.module';
import { AccountModule } from '../../features/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('AUTHS_URI'),
      }),
      inject: [ConfigService],
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
    SessionModule,
  ],
  controllers: [SessionController],
})
export class AuthModule {}
