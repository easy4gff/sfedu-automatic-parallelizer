import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule, FileUploadModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

import { StepButtonsModule } from '../../step-buttons/step-buttons.module';

import { OptionsListComponent } from './options-list/options-list.component';

import { ManageLibraryExamplesService } from './manage-library-examples.service';
import { ManageOptionExampleComponent } from './manage-option-example/manage-option-example.component';
import { ActionListComponent } from './action-list/action-list.component';
import { AddExampleComponent } from './add-example/add-example.component';
import { EditExampleComponent } from './edit-example/edit-example.component';

@NgModule({
  imports: [
    CommonModule,
    ListboxModule,
    StepButtonsModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [
    OptionsListComponent,
    ManageOptionExampleComponent,
    ActionListComponent,
    AddExampleComponent,
    EditExampleComponent
  ],
  providers: [
    ManageLibraryExamplesService
  ]
})
export class ManageLibraryExamplesModule { }
