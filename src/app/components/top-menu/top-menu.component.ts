import { Component, OnInit } from '@angular/core';
import { LayoutSwitcherService } from '../../services/layout-switcher.service';
import { SliderMenuService } from '../../services/slider-menu.service';

@Component({
  selector: 'app-top-menu',
  template: `
    <div id="top-menu" *ngIf="true">
      <img
        id="slider-menu-launcher"
        [src]="'assets/images/slider-menu-launcher.png'"
        [height]="50"
        (click)="showMenu()"/>
    </div>
  `,
  styles: [`
    #top-menu {
      background-color: rgb(35, 153, 229);
      height: 50px;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 5; /* I am really sorry about this :( */
    }

    #slider-menu-launcher {
      margin-left: 10px;
      padding-left: 10px;
    }
  `]
})
export class TopMenuComponent implements OnInit {

  constructor(private sliderMenuService: SliderMenuService) { }

  ngOnInit() {

  }

  showMenu(): void {
    this.sliderMenuService.show();
  }

}
