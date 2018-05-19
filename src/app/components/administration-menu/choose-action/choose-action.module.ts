import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListboxModule } from 'primeng/primeng';
import { StepButtonsModule } from '../../step-buttons/step-buttons.module';

import { ChooseActionComponent } from './choose-action.component';

@NgModule({
  imports: [
    CommonModule,
    ListboxModule,
    FormsModule,
    StepButtonsModule
  ],
  declarations: [
    ChooseActionComponent
  ],
  exports: [

  ]
})
export class ChooseActionModule { }
