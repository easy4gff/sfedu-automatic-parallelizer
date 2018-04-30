import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ParallelingMenuModule } from './components/paralleling-menu/paralleling-menu.module';
import { AppComponent } from './app.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { ParallelingMenuComponent } from './components/paralleling-menu/paralleling-menu.component';
import { LanguageSelectorModule } from './components/language-selector/language-selector.module';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';

import { ParallelizingOptionsService } from './services/parallelizing-options.service';
import { FileInputMethodService } from './services/file-input-method.service';
import { LanguageService } from './services/language.service';
import { SourceCodeDialogService } from './services/source-code-dialog.service';
import { SessionService } from './services/session.service';
import { AppHttpService } from './services/app-http.service';
import { OptionRequestBuilderService } from './services/option-request-builder.service';

import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    NavbarComponent,
    MainComponent,
    LeftPanelComponent,
  ],
  imports: [
    BrowserModule,
    ParallelingMenuModule,
    BrowserAnimationsModule,
    LanguageSelectorModule,
    Ng2Webstorage,
    HttpClientModule
  ],
  providers: [
    ParallelizingOptionsService,
    FileInputMethodService,
    LanguageService,
    SourceCodeDialogService,
    SessionService,
    AppHttpService,
    OptionRequestBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
