import { Component, OnInit, HostListener } from '@angular/core';
import { LayoutSwitcherService } from '../../services/layout-switcher.service';

@Component({
  selector: 'app-main',
  template: `
    <app-paralleling-menu></app-paralleling-menu>

    <app-example-source-code-dialog></app-example-source-code-dialog>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  public mobileLayoutActive: boolean;

  constructor(private layoutSwitcher: LayoutSwitcherService) { }

  ngOnInit() {
    this.mobileLayoutActive = this.layoutSwitcher.isMobileLayout();
    if (this.mobileLayoutActive) {
      console.log('Mobile layout');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('I wonder if I work');
  }

}
