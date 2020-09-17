import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'lib-shared',
  template: `
    <h1>Shared library works!</h1>
    <textarea (keyup)="onKey($event)"></textarea>
    <br />
    <button type="button" (click)="clean()">Clean</button>
    <p>{{ values }}</p>
  `,
  styles: [``],
})
export class SharedComponent implements OnInit {
  values = '';
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  onKey(event: any): void {
    this.values = this.sharedService.beCool(event.target.value);
  }

  clean(): void {
    this.values = '';
  }
}
