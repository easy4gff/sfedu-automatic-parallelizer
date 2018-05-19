import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-administration-menu',
  template: `
    <p>
      <p-panel [header]="labelAdministrationMenu">
        <router-outlet></router-outlet>
      </p-panel>
    </p>
  `,
  styles: []
})
export class AdministrationMenuComponent implements OnInit {
  labelAdministrationMenu: string;

  constructor(
    private routingService: RoutingService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.routingService.redirectHomeIfNotLoggedIn();

    this.langService.currentLanguage$.subscribe(lang => {
      this.labelAdministrationMenu = this.langService.get(LanguageConstants.ADMINISTRATION_MENU);
    });
  }

}
