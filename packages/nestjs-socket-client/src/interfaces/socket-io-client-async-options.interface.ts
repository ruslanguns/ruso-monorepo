import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { SocketIoClientOptions } from './socket-io-client-options.interface';
import { SocketIoClientOptionsFactory } from './socket-io-client-options-factory.interface';

export interface SocketIoClientAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<SocketIoClientOptionsFactory>;
  useClass?: Type<SocketIoClientOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<SocketIoClientOptions> | SocketIoClientOptions;
}
