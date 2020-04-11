import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolaMundo2Component } from './hola-mundo.component';

@NgModule({
  declarations: [HolaMundo2Component],
  imports: [CommonModule],
  exports: [HolaMundo2Component],
})
export class MiModulo2Module {}
