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
import { StepButtonsModule } from './components/step-buttons/step-buttons.module';
import { LeftPanelModule } from './components/left-panel/left-panel.module';
import { NavbarModule} from './components/navbar/navbar.module';

// Components
import { AppComponent } from './app.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { MainComponent } from './components/main/main.component';
import { ParallelingMenuComponent } from './components/paralleling-menu/paralleling-menu.component';

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
import { AdministrationActivityService } from './services/administration/administration-activity.service';
import { AdminParallelizingOptionsService } from './services/administration/admin-parallelizing-options.service';
import { AdminCodeExamplesService } from './services/administration/admin-code-examples.service';
import { LayoutSwitcherService } from './services/layout-switcher.service';
import { SliderMenuService } from './services/slider-menu.service';

import { Ng2Webstorage } from 'ngx-webstorage';

import { routes } from './app.routes';
import { DocumentationModule } from './components/documentation/documentation.module';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    MainComponent,
    TopMenuComponent
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
    StepButtonsModule,
    LeftPanelModule,
    NavbarModule,
    DocumentationModule,
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
    RoutingService,
    AdministrationActivityService,
    AdminParallelizingOptionsService,
    AdminCodeExamplesService,
    LayoutSwitcherService,
    SliderMenuService
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
