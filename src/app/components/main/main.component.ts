import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <app-paralleling-menu></app-paralleling-menu>

    <app-example-source-code-dialog></app-example-source-code-dialog>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
