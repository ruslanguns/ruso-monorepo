import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './common/pipes';
import { SharedComponent } from './shared.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [SharedComponent],
  exports: [SharedComponent, PipesModule],
  imports: [FormsModule, PipesModule],
  providers: [SharedService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SharedService],
    };
  }
}
