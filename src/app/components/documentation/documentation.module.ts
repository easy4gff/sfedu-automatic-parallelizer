import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';

import { DocumentationComponent } from './documentation.component';
import { InputTexteditorModule } from '../paralleling-menu/step/input-texteditor/input-texteditor.module';

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    InputTexteditorModule
  ],
  declarations: [
    DocumentationComponent
  ]
})
export class DocumentationModule { }
