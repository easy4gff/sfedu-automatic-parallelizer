import { Component, OnInit } from '@angular/core';
import { LayoutSwitcherService } from '../../services/layout-switcher.service';

@Component({
  selector: 'app-left-panel',
  template: `
    <p-sidebar
      [visible]="getVisibility()"
      [modal]="false"
    >
      <div id="language-selector-div">
        <app-language-selector></app-language-selector>
      </div>

      <app-user-panel></app-user-panel>

      <app-navbar></app-navbar>
    </p-sidebar>
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

  constructor(
    private layoutSwitcher: LayoutSwitcherService
  ) { }

  ngOnInit() {
  }

  getVisibility(): boolean {
    return !this.layoutSwitcher.isMobileLayout();
  }
}
