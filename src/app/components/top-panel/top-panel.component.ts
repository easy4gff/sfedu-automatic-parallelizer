import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-top-panel',
  template: `
    <header>
      <h1>{{header}}</h1>
    </header>

    <!-- <app-navbar></app-navbar> -->
  `,
  styles: [`
        h1 {
          text-align: center;
          color: crimson;
        }

        @media screen and (max-width: 1000px) {
          header {
            margin: 50px;
          }
        }
  `]
})
export class TopPanelComponent implements OnInit {
  header: string;

  constructor(private langService: LanguageService) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.header = this.langService.get(LanguageConstants.SITE_TITLE);
    });
  }

}
