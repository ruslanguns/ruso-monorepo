import { DynamicModule, Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import {
  SocketIoClientAsyncOptions,
  SocketIoClientOptions,
} from './interfaces';
import { connectionFactory } from './socket-io-client.connection.provider';
import {
  createSocketIoClientAsyncProviders,
  createSocketIoClientProviders,
} from './socket-io-client.provider';
import { SocketIoClientService } from './socket-io-client.service';

/**
 * Socket.io client module.
 *
 * This module will create a socket.io client instance and expose an instance
 * to be listening to socket.io events as well to interact with the socket
 * server.
 *
 * You can use this module to create a socket.io client instance and expose it
 * using albitriary options with **forRoot()** method.
 * @example
 * ```ts
 * SocketIoClientModule.forRoot({
 *    url: 'wss://socket-server',
 *    jsonp: false,
 * })
 * ```
 *
 * Or you can use this module to create a socket.io client instance and expose it
 * using **async options** using **forRootAync()** method.
 * @example
 * ```ts
 * SocketIoClientModule.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: (config: ConfigService) => ({
 *    url: 'wss://socket-server',
 *   jsonp: false,
 *   }),
 *   inject: [ConfigService],
 * }),
 * ```
 */
@Global()
@Module({
  providers: [SocketIoClientService, connectionFactory],
  exports: [SocketIoClientService, connectionFactory],
})
export class SocketIoClientModule {
  /**
   * Registers a Socket.io client module for the Nest application with options
   * @param options Async SocketIoClientOptions
   * @returns Dynamic Module
   */
  static forRoot(options: SocketIoClientOptions): DynamicModule {
    return {
      module: SocketIoClientModule,
      imports: [DiscoveryModule],
      providers: createSocketIoClientProviders(options),
    };
  }

  /**
   * Registers a Socket.io client module for the Nest application with async options
   * @param options Async SocketIoClientOptions
   * @returns Dynamic Module
   */
  static forRootAsync(options: SocketIoClientAsyncOptions): DynamicModule {
    return {
      module: SocketIoClientModule,
      imports: [DiscoveryModule],
      providers: [...createSocketIoClientAsyncProviders(options)],
    };
  }
}
