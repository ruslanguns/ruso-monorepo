import { ManagerOptions, SocketOptions } from 'socket.io-client';

export type SocketIoClientOptions = { url: string } & Partial<
  ManagerOptions & SocketOptions
>;
