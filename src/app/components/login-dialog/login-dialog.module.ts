import { NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
    DialogModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule
} from 'primeng/primeng';

import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
    imports: [
        DialogModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        BrowserModule
    ],
    declarations: [
        LoginDialogComponent
    ],
    providers: [

    ],
    exports: [
        LoginDialogComponent
    ]
})
export class LoginDialogModule {}
