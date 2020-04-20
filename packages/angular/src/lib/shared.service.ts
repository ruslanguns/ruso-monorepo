import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  constructor() {}

  beCool(message: string): string {
    return `From Library: What's up ${message}`;
  }
}
