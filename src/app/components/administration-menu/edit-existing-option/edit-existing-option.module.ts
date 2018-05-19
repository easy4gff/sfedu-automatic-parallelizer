import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListboxModule } from 'primeng/primeng';
import { StepButtonsModule } from '../../step-buttons/step-buttons.module';

import { EditExistingOptionComponent } from './edit-existing-option.component';
import { OptionEditorComponent } from './option-editor/option-editor.component';
import { OptionRepresentationModule } from '../option-representation/option-representation.module';

import { EditExistingOptionService } from './edit-existing-option.service';


@NgModule({
  imports: [
    CommonModule,
    ListboxModule,
    StepButtonsModule,
    FormsModule,
    OptionRepresentationModule
  ],
  declarations: [
    EditExistingOptionComponent,
    OptionEditorComponent
  ],
  providers: [
    EditExistingOptionService
  ]
})
export class EditExistingOptionModule { }
