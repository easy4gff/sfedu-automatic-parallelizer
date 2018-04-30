import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  template: `
      <div id="language-selector-div">
        <app-language-selector></app-language-selector>
      </div>
      <div class="todo-userinfo-component">
        Probably future user component
      </div>
      <app-navbar></app-navbar>
  `,
  styles: [`

    .todo-userinfo-component {
      height: 250px;
      border: 2px solid red;
    }

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
