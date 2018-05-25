import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';
import { RoutingConstants } from '../../model/routing-utils/routing-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav id="navbar">
      <ul>
        <li role="presentation">
          <a [routerLink]="linkHome">{{ homeLabel }}</a>
        </li>
        <li role="presentation">
          <a [routerLink]="linkDocumentation">{{ documentationLabel }}</a>
        </li>
      </ul>
    </nav>

    <h1 *ngIf="isDocumentationPage()">THIS IS GOING TO BE A DOCUMENTATION NAVIGATION<h1>
  `,
  styles: [`
    nav {
      margin-top: 20px;
    }

    ul {
      display: block;
      margin: 0px;
      padding: 0;
    }

    li {
      display: block;
      text-align: center;
      margin: 5px;
      padding: 0;
    }

    a,
    a:visited {
      text-decoration: none;
      color: black;
      margin-right: 10px;
      font-size: 20px;
    }

  `]
})
export class NavbarComponent implements OnInit {
  homeLabel: string;
  documentationLabel: string;

  linkHome = '';
  linkDocumentation = `/${RoutingConstants.DOCUMENTATION}`;

  constructor(
    private langService: LanguageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.homeLabel = this.langService.get(LanguageConstants.HOME_PAGE);
      this.documentationLabel = this.langService.get(LanguageConstants.DOCUMENTATION);
    });
  }

  isDocumentationPage(): boolean {
    return this.router.url.includes(RoutingConstants.DOCUMENTATION);
  }

}
