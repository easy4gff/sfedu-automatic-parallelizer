import { Component, HostListener, OnInit } from '@angular/core';
import { LayoutSwitcherService } from './services/layout-switcher.service';

@Component({
  selector: 'app-root',
  template: `
    <!--<div class="left-panel ui-g-3">
      <app-left-panel></app-left-panel>
    </div> -->
    <app-left-panel></app-left-panel>

    <!-- <div class="ui-md-offset-3 ui-md-9 ui-lg-offset-3 ui-lg-9"> -->
    <main>
      <div class="ui-g">
        <div *ngIf="mobileLayout" class="ui-g-12 no-padding">
          <app-top-menu></app-top-menu>
        </div>
        <div class="ui-g-12 ui-md-10 ui-md-offset-1 ui-lg-10 ui-lg-offset-1">
          <app-top-panel></app-top-panel>
        </div>
        <!-- <app-main></app-main> -->
        <!-- <div class="ui-g-offset-1 ui-g-10"> -->
        <div class="ui-g-12 ui-md-10 ui-md-offset-1 ui-lg-10 ui-lg-offset-1">
            <router-outlet></router-outlet>
        </div>
      </div>
    </main>

    <app-login-dialog></app-login-dialog>
  `,
  styles: [`

    .no-padding {
      padding: 0px;
    }

    @media screen and (min-width: 1000px) {
      main {
          margin-left: 340px;
          /*position: fixed;
          display: block;
          height: 100%;
          border: 2px solid black;*/
      }
    }

    /*@media screen and (max-width: 999px) {
        .left-panel {
            display: block;
            width: 100%;
            border: 2px solid black;
        }
    } */
  `]
})
export class AppComponent implements OnInit {
    mobileLayout: boolean;

    constructor(private layoutSwitcher: LayoutSwitcherService) {}

    ngOnInit(): void {
      this.mobileLayout = this.layoutSwitcher.isMobileLayout();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.mobileLayout = this.layoutSwitcher.isMobileLayout();
    }
}
