import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRepresentationModule } from '../option-representation/option-representation.module';
import { StepButtonsModule } from '../../step-buttons/step-buttons.module';

import { NewOptionBuilderComponent } from './new-option-builder.component';

@NgModule({
  imports: [
    CommonModule,
    OptionRepresentationModule,
    StepButtonsModule
  ],
  declarations: [
    NewOptionBuilderComponent
  ]
})
export class NewOptionBuilderModule { }
