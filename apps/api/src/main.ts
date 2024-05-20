/** build: 70x */
import 'newrelic';
import { NestFactory } from '@nestjs/core';
import { Logger, ShutdownSignal } from '@nestjs/common';
import { options } from './program';

import { UsersModule } from './apps/users/users.module';
import { ComponentsModule } from './apps/components/components.module';

const SHUTDOWN_SIGNALS = [
  ShutdownSignal.SIGHUP,
  ShutdownSignal.SIGINT,
  ShutdownSignal.SIGTERM,
];

const { NODE_ENV, PORT } = process.env;

async function bootstrap() {
  Logger.log(`starting in '${options.mode}' mode`);

  if (options.mode === 'users') {
    const app = await NestFactory.create(UsersModule);

    app.enableShutdownHooks(SHUTDOWN_SIGNALS);

    app.enableCors();

    const port = parseInt(PORT || '4001', 10);

    await app.listen(port);

    Logger.log(
      `🚀 running in '${options.mode}' mode on: host=http://localhost:${port}/ env=${NODE_ENV}`
    );

    return;
  }

  if (options.mode === 'components') {
    const app = await NestFactory.create(ComponentsModule);

    app.enableShutdownHooks(SHUTDOWN_SIGNALS);

    app.enableCors();

    const port = parseInt(PORT || '4002', 10);

    await app.listen(port);

    Logger.log(
      `🚀 running in '${options.mode}' mode on: host=http://localhost:${port}/ env=${NODE_ENV}`
    );

    return;
  }
}

bootstrap().catch((err) => {
  Logger.error(err);

  throw err;
});
