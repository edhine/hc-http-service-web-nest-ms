import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Message } from './domain/message';

@Controller()
@ApiTags('notifications')
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) { }

  // POR EVENTOS (ASYNC)
  @Get()
  getHello(@Res() res) {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    res.status(200).send({ ...process.env });
    // return 'Hello World printed - ASYNC';
  }

  // POR OBSERVABLE (SYNC)
  @Post()
  postHello() {
    return this.client.send<number>({ cmd: 'send' }, new Message('Hello World - SYNC'));
  }
}
