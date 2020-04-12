import { APP_INTERCEPTOR } from '@nestjs/core';
import { DynamicModule, Module } from '@nestjs/common';
import { LoggingInterceptor } from './loggin.interceptor';

@Module({})
export class InterceptorModule {
  static forRoot(): DynamicModule {
    return {
      module: InterceptorModule,
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
        },
      ],
    };
  }
}
