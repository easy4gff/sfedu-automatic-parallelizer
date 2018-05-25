import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';

import { LeftPanelComponent } from './left-panel.component';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { UserPanelModule } from '../user-panel/user-panel.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    LanguageSelectorModule,
    UserPanelModule,
    NavbarModule
  ],
  declarations: [
    LeftPanelComponent
  ],
  exports: [
    LeftPanelComponent
  ]
})
export class LeftPanelModule { }
