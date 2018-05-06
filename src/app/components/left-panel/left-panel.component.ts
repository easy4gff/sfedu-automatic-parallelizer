import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  template: `
      <div id="language-selector-div">
        <app-language-selector></app-language-selector>
      </div>

      <app-user-panel></app-user-panel>

      <app-navbar></app-navbar>
  `,
  styles: [`

    #language-selector-div {
      /*height: 100px;
      border: 2px solid red;*/
      margin-bottom: 10px;
    }
  `]
})
export class LeftPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
