import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildModule } from '../../features/builds/build.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('BUILDS_URI'),
      }),
      inject: [ConfigService],
    }),

    BuildModule,
  ],
  providers: [],
})
export class BuildsModule {}
