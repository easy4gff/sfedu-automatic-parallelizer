import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Sidebar } from 'primeng/primeng';

import { LayoutSwitcherService } from '../../services/layout-switcher.service';
import { SliderMenuService } from '../../services/slider-menu.service';
import { Subscription } from 'rxjs/Subscription';
import { SliderMenuServiceEventType } from '../../model/slider-menu/slider-menu-service-event-type';

@Component({
  selector: 'app-left-panel',
  template: `
    <p-sidebar
      [visible]="getVisibility()"
      [modal]="false"
      (onHide)="hideSlider()"
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

    @media screen and (min-width: 1001px) {
      :host ::ng-deep .ui-sidebar-close {
        display: none;
      }
    }
  `]
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  @ViewChild(Sidebar) sidebar: Sidebar;

  sliderMenuServiceEvents$$: Subscription;

  constructor(
    private layoutSwitcher: LayoutSwitcherService,
    private sliderMenuService: SliderMenuService,
  ) { }

  ngOnInit() {
    this.sliderMenuServiceEvents$$ = this.sliderMenuService.events$.subscribe((event) => {
      // switch (event) {
      //   case SliderMenuServiceEventType.SHOW:
      //     this.sidebar.show();
      //     break;
      //   case SliderMenuServiceEventType.HIDE:
      //     this.sidebar.hide();
      //     break;
      //   default:
      //     // SKIP
      // }
    });
  }

  ngOnDestroy() {
    this.sliderMenuServiceEvents$$.unsubscribe();
  }

  getVisibility(): boolean {
    return !this.layoutSwitcher.isMobileLayout() ||
            this.sliderMenuService.events$.getValue() === SliderMenuServiceEventType.SHOW;
  }

  hideSlider(): void {
    this.sliderMenuService.hide();
  }
}
