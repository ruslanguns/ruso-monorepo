import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Type,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Socket } from 'socket.io-client';
import {
  SOCKET_EVENT_METADATA,
  SOCKET_IO_CLIENT,
  SOCKET_OPTIONS,
} from './constants';
import { EventMetadata } from './interfaces';

@Injectable()
export class SocketIoClientEventLoader
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @Inject(SOCKET_OPTIONS)
    private readonly socketOptions: { autoConnect?: boolean },
    @Inject(SOCKET_IO_CLIENT)
    private readonly socket: Socket,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onApplicationBootstrap() {
    this.loadEventListeners();
    if (this.socketOptions.autoConnect === false) return;
    this.socket.connect();
  }

  onApplicationShutdown() {
    this.socket.disconnect();
  }

  loadEventListeners() {
    const providers = this.discoveryService.getProviders();
    const controllers = this.discoveryService.getControllers();
    [...providers, ...controllers]
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance)
      .forEach((wrapper: InstanceWrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);
        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (methodKey: string) =>
            this.subscribeToEventIfListener(instance, methodKey),
        );
      });
  }

  private subscribeToEventIfListener(
    instance: Record<string, any>,
    methodKey: string,
  ) {
    const socketEventMetadata = this.getEventHandlerMetadata(
      instance[methodKey],
    );

    if (!socketEventMetadata) return;

    const { event } = socketEventMetadata;

    this.socket.on(event, (...args: unknown[]) =>
      instance[methodKey].call(instance, ...args),
    );
  }

  private getEventHandlerMetadata(target: Type<unknown>): EventMetadata {
    return this.reflector.get<EventMetadata>(SOCKET_EVENT_METADATA, target);
  }
}
