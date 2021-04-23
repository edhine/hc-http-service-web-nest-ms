import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: 'HELLO_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('HC_NOTIFICATIONS_API_SVC_PORT_3000_TCP_ADDR'),
            port: configService.get('HC_NOTIFICATIONS_API_SVC_PORT_3000_TCP_PORT') || 4000,
          }
        })
    }
  ],
})
export class AppModule { }
