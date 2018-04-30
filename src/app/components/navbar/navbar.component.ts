import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-navbar',
  template: `
    <nav id="navbar">
      <ul>
        <li role="presentation">
          <a href="">{{ homeLabel }}</a>
        </li>
        <li role="presentation">
          <a href="">{{ documentationLabel }}</a>
        </li>
      </ul>
    </nav>
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

  constructor(private langService: LanguageService) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.homeLabel = this.langService.get(LanguageConstants.HOME_PAGE);
      this.documentationLabel = this.langService.get(LanguageConstants.DOCUMENTATION);
    });
  }

}
