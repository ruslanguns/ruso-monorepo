import { NgModule } from '@angular/core';
import { SlugifyPipe } from './strings';

const PIPES = [SlugifyPipe];

@NgModule({
  declarations: [PIPES],
  exports: [PIPES],
})
export class PipesModule {}
export { SlugifyPipe } from './strings';
