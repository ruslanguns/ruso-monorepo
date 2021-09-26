import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { SOCKET_OPTIONS } from './constants';
import { SocketIoClientOptions } from './interfaces/socket-io-client-options.interface';

interface ISocketIoClientService {
  connect(): Promise<Socket<DefaultEventsMap, DefaultEventsMap>>;
}

@Injectable()
export class SocketIoClientService implements ISocketIoClientService {
  private readonly logger: Logger;
  private _socketIoConnection: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(
    @Inject(SOCKET_OPTIONS)
    private _SocketIoClientOptions: SocketIoClientOptions,
  ) {
    this.logger = new Logger('SocketIO Service');
    this.logger.log(`Options: ${JSON.stringify(this._SocketIoClientOptions)}`);
  }

  async connect() {
    const { io } = await import('socket.io-client');
    const { url, ...rest } = this._SocketIoClientOptions;
    if (!url) throw new BadRequestException('Socket.io url is not defined');
    if (!this._socketIoConnection) {
      this._socketIoConnection = io(url, {
        ...rest,
        autoConnect: false,
      });
    }
    return this._socketIoConnection;
  }
}
