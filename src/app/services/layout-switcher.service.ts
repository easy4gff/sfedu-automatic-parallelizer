import { Injectable } from '@angular/core';
import { LayoutSwitcherConstants } from '../model/layout-switcher/layout-switcher-constants';

@Injectable()
export class LayoutSwitcherService {
  layoutConstants: LayoutSwitcherConstants = new LayoutSwitcherConstants();

  constructor() {

  }

  isMobileLayout(): boolean {
    return window.innerWidth < this.layoutConstants.SWITCH_TRESHOLD;
  }

  getLeftPanelWidth(): number {
    return this.isMobileLayout()
           ? 0
           : this.layoutConstants.LEFT_PANEL_WIDTH_DESKTOP;
  }
}
