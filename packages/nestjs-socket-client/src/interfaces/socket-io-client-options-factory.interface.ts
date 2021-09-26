import { SocketIoClientOptions } from './socket-io-client-options.interface';

export interface SocketIoClientOptionsFactory {
  createSocketIoOptions():
    | Promise<SocketIoClientOptions>
    | SocketIoClientOptions;
}
