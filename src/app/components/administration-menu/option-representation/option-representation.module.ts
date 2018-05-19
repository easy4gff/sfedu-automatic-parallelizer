import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StepButtonsModule } from '../../step-buttons/step-buttons.module';

import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';

import { OptionRepresentationComponent } from './option-representation.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    StepButtonsModule,
    InputSwitchModule,
    ListboxModule
  ],
  declarations: [
    OptionRepresentationComponent
  ],
  exports: [
    OptionRepresentationComponent
  ]
})
export class OptionRepresentationModule { }
