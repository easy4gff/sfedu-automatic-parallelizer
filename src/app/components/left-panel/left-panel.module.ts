import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';

import { LeftPanelComponent } from './left-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule
  ],
  declarations: [
    LeftPanelComponent
  ]
})
export class LeftPanelModule { }
