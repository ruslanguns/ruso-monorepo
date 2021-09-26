import { SOCKET_OPTIONS } from './constants';
import {
  SocketIoClientOptions,
  SocketIoClientAsyncOptions,
  SocketIoClientOptionsFactory,
} from './interfaces';
import { Provider } from '@nestjs/common';
import { SocketIoClientEventLoader } from './socket-io-client-event.loader';

/**
 * Create a socket.io client providers.
 *
 * @param options Socket.io options.
 * @returns Socket.io client providers.
 */
export function createSocketIoClientProviders(
  options: SocketIoClientOptions,
): Provider[] {
  return [
    {
      provide: SOCKET_OPTIONS,
      useValue: options,
    },
    SocketIoClientEventLoader,
  ];
}

/**
 * Create a async socket.io client providers.
 *
 * @param options Socket.io options.
 * @returns Socket.io client providers.
 */
export function createSocketIoClientAsyncProviders(
  options: SocketIoClientAsyncOptions,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createOptionsProvider(options), SocketIoClientEventLoader];
  }

  return [
    createOptionsProvider(options),
    {
      provide: options.useClass,
      useClass: options.useClass,
    },
    SocketIoClientEventLoader,
  ];
}

function createOptionsProvider(options: SocketIoClientAsyncOptions): Provider {
  if (options.useFactory) {
    return {
      provide: SOCKET_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
  return {
    provide: SOCKET_OPTIONS,
    useFactory: async (optionsFactory: SocketIoClientOptionsFactory) =>
      await optionsFactory.createSocketIoOptions(),
    inject: [options.useExisting || options.useClass],
  };
}
