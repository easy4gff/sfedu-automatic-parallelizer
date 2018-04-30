import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LanguageSelectorComponent } from './language-selector.component';

import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    LanguageSelectorComponent
  ],
  imports: [
    DropdownModule,
    FormsModule
  ],
  exports: [
    LanguageSelectorComponent
  ]
})
export class LanguageSelectorModule { }
