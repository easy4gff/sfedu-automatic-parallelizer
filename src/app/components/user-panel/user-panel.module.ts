import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
    PanelModule,
    ButtonModule
} from 'primeng/primeng';

import { UserPanelComponent } from './user-panel.component';

@NgModule({
    imports: [
        PanelModule,
        ButtonModule,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        UserPanelComponent
    ],
    exports: [
        UserPanelComponent
    ]
})
export class UserPanelModule {

}
