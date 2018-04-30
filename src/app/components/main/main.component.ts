import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="ui-g-offset-1 ui-g-10">
      <app-paralleling-menu></app-paralleling-menu>
    </div>

    <app-example-source-code-dialog></app-example-source-code-dialog>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
