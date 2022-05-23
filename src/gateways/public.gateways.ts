import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PublicGateway {
  @WebSocketServer() server;

  @SubscribeMessage('public')
  handlePublic(@MessageBody() message: string) {
    this.server.emit('public', message);
  }
}
