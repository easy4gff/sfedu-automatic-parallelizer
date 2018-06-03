import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

import { ParallelingMenuComponent } from './paralleling-menu.component';
import { ParallelizingOptionComponent } from './step/parallelizing-options/parallelizing-options';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { InputFileMethodComponent } from './step/input-file-method/input-file-method.component';
import { RoutingConstants } from '../../model/routing-utils/routing-constants';
import { FileUploadComponent } from './step/file-upload/file-upload.component';
import { DecipherCaptchaComponent } from './step/decipher-captcha/decipher-captcha.component';
import { InputTexteditorModule } from './step/input-texteditor/input-texteditor.module';

import { CodemirrorModule } from 'ng2-codemirror';
import { InputTexteditorMenuComponent } from './step/input-texteditor-menu/input-texteditor-menu.component';
import { LibraryExamplesComponent } from './step/library-examples/library-examples.component';
import { ExampleSourceCodeDialogComponent } from './step/example-source-code-dialog/example-source-code-dialog.component';
import { StepButtonsModule } from '../step-buttons/step-buttons.module';

export const parallizilingMenuRoutes: Routes = [
  { path: '', redirectTo: RoutingConstants.PARALLELIZING_OPTIONS, pathMatch: 'full' },
  { path: RoutingConstants.PARALLELIZING_OPTIONS, component: ParallelizingOptionComponent },
  { path: RoutingConstants.INPUT_FILE_METHOD, component: InputFileMethodComponent },
  { path: RoutingConstants.UPLOAD_CUSTOM_FILE, component: FileUploadComponent },
  { path: RoutingConstants.DECIPHER_CAPTCHA, component: DecipherCaptchaComponent },
  { path: RoutingConstants.INPUT_FROM_TEXT_EDITOR, component: InputTexteditorMenuComponent },
  { path: RoutingConstants.CHOOSE_FILE_FROM_LIBRARY, component: LibraryExamplesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    RouterModule,
    // RouterModule.forChild(parallizilingMenuRoutes),
    ListboxModule,
    FormsModule,
    FileUploadModule,
    CodemirrorModule,
    DialogModule,
    StepButtonsModule,
    InputTexteditorModule,
    TabViewModule,
    BrowserModule
  ],
  declarations: [
    ParallelingMenuComponent,
    ParallelizingOptionComponent,
    InputFileMethodComponent,
    FileUploadComponent,
    DecipherCaptchaComponent,
    InputTexteditorMenuComponent,
    LibraryExamplesComponent,
    ExampleSourceCodeDialogComponent
  ],
  exports: [
    ParallelingMenuComponent,
    ExampleSourceCodeDialogComponent
    // ParallelizingOptionComponent // Test
  ]
})
export class ParallelingMenuModule { }
