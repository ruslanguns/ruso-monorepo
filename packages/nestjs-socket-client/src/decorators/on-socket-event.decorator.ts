import { SetMetadata } from '@nestjs/common';
import { SOCKET_EVENT_METADATA } from '../constants';

/**
 * This is a decorator that will allow you the metadata and execution to get
 * the events from the socket connection, you can capture the payload by using
 * an argument in the method.
 *
 * @example
 * ```ts
 * @OnSocketEvent('event-name')
 * fireSomething(payload: any) {
 *    this.logger.log(payload)
 * }
 * ```
 * @param event eventName to be listening at
 * @returns set the metadata for listen the events from the socket event
 */
export const OnSocketEvent = (event: string) =>
  SetMetadata(SOCKET_EVENT_METADATA, { event });
