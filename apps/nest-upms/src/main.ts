import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
export async function bootstrap(status?: boolean) {
  const app = await NestFactory.create(ApplicationModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:3010',
      package: 'notadd',
      protoPath: `${__dirname}/main.proto`
    }
  })
  if (status === false) {
    await app.close();
  } else {
    await app.startAllMicroservicesAsync();
    await app.listen(9000);
  }
}
bootstrap();
