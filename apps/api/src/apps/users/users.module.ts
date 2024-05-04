import { Module } from '@nestjs/common';
import { CaseResolver } from './resolvers/case.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentModule } from '../../features/component/component.module';

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

    ComponentModule,
  ],
  providers: [],
})
export class ComponentsModule {}
