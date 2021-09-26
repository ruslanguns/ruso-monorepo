# NestJS Socket.IO Client

A minimal Socket-IO client wrapper for your NestJS applications.

## Instalation

> Package has to be installed with the socket.io-client v4+.

Via npm `npm install @ruso/nestjs-socket-client socket.io-client`

Via yarn `yarn add @ruso/nestjs-socket-client socket.io-client`

## Usage

In your AppModule file:

```ts
import { Module } from '@nestjs/common';
import { SocketIoClientModule } from '@ruso/nestjs-socket-client';

@Module({
	imports: [
		SocketIoClientModule.forRoot({
			url: 'ws://localhost'
			// ... options for the client
			// https://socket.io/docs/v4/client-api/#new-Manager-url-options
		})
	]
})
export class AppModule {}
```

For asyncrounous configuration use `forRootAsync()`:

```ts
import { Module } from '@nestjs/common';
import { SocketIoClientModule } from '@ruso/nestjs-socket-client';

@Module({
	imports: [
		SocketIoClientModule.forRootAsync({
			import: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				url: config.get('SOCKET_IO_URL')
				// ... options for the client
				// https://socket.io/docs/v4/client-api/#new-Manager-url-options
			}),
			injectable: [ConfigService]
		})
	]
})
export class AppModule {}
```

And in your service:

```ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { SocketIoClientModule, OnSocketEvent, SOCKET_IO_CLIENT } from '@ruso/nestjs-socket-client';
import { Socket } from 'socket.io-client';

@Injectable()
export class Service {
	private logger = new Logger('Service');

	/**
	 * Inject the socket instance and use it's methods this way:
	 */
	constructor(@Inject(SOCKET_IO_CLIENT) private readonly socket: Socket) {}

	@OnSocketEvent('connect')
	onConnect() {
		this.logger.log('Successfully connected the socket.io server!');
	}
}
```

## Thanks

This repository is an extended version of [another project](https://github.com/danocmx/nestjs-socket.io-client) built by [@danocmx](https://github.com/danocmx), so special thanks to him for this contribution.

## Author

Ruslan Gonzalez

- Twitter: [@ruslangonzalez](https://twitter.com/ruslangonzalez)
- GitHub: [@ruslanguns](https://github.com/ruslanguns)
