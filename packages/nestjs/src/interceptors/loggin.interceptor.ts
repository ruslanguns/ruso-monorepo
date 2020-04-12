import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger('@ruso/nestjs');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.debug(`After... ${Date.now() - now}ms`)));
  }
}
