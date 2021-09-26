import { Provider } from '@nestjs/common';
import { SOCKET_IO_CLIENT } from './constants';
import { SocketIoClientService } from './socket-io-client.service';

export const connectionFactory: Provider = {
  provide: SOCKET_IO_CLIENT,
  useFactory: async (client: SocketIoClientService) => {
    return await client.connect();
  },
  inject: [SocketIoClientService],
};
