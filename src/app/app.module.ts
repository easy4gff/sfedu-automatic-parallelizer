import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Custom Modules
import { LanguageSelectorModule } from './components/language-selector/language-selector.module';
import { ParallelingMenuModule } from './components/paralleling-menu/paralleling-menu.module';
import { UserPanelModule } from './components/user-panel/user-panel.module';
import { LoginDialogModule } from './components/login-dialog/login-dialog.module';
import { AdministrationMenuModule } from './components/administration-menu/administration-menu.module';

// Components
import { AppComponent } from './app.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { ParallelingMenuComponent } from './components/paralleling-menu/paralleling-menu.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';

// Services
import { ParallelizingOptionsService } from './services/parallelizing-options.service';
import { FileInputMethodService } from './services/file-input-method.service';
import { LanguageService } from './services/language.service';
import { SourceCodeDialogService } from './services/source-code-dialog.service';
import { SessionService } from './services/session.service';
import { AppHttpService } from './services/app-http.service';
import { OptionRequestBuilderService } from './services/option-request-builder.service';
import { LoginDialogService } from './services/login-dialog.service';
import { LoginService } from './services/login.service';
import { RoutingService } from './services/routing.service';

import { Ng2Webstorage } from 'ngx-webstorage';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    NavbarComponent,
    MainComponent,
    LeftPanelComponent
  ],
  imports: [
    BrowserModule,
    ParallelingMenuModule,
    BrowserAnimationsModule,
    LanguageSelectorModule,
    Ng2Webstorage,
    HttpClientModule,
    UserPanelModule,
    LoginDialogModule,
    AdministrationMenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ParallelizingOptionsService,
    FileInputMethodService,
    LanguageService,
    SourceCodeDialogService,
    SessionService,
    AppHttpService,
    OptionRequestBuilderService,
    LoginDialogService,
    LoginService,
    RoutingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
