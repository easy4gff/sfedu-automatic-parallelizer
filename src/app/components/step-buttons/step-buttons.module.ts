import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/primeng';

import { StepButtonsComponent } from './step-buttons.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        ButtonModule,
        RouterModule,
        BrowserModule
    ],
    declarations: [
        StepButtonsComponent
    ],
    exports: [
        StepButtonsComponent
    ]
})
export class StepButtonsModule {}
