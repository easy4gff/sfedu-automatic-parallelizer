import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from 'ng2-codemirror';

import { InputTexteditorComponent } from './input-texteditor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule
  ],
  declarations: [
    InputTexteditorComponent
  ],
  exports: [
    InputTexteditorComponent
  ]
})
export class InputTexteditorModule { }
