import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../model/language/language-class';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="language-selector-container">
      <div id="title" class="item">{{ selectLanguageLabel }}:</div>
      <div class="item">
        <p-dropdown [options]="languages" [style]="{'width':'120px'}" [(ngModel)]="selectedLanguage" (onChange)="changeLang()">
          <ng-template let-item pTemplate="selectedItem">
              <img src="assets/images/language/{{item.value}}.png" style="width:16px;vertical-align:middle" />
              <span style="vertical-align:middle">{{item.label}}</span>
          </ng-template>
          <ng-template let-lang pTemplate="item">
              <div class="ui-helper-clearfix" style="position: relative;height: 25px;">
                  <img src="assets/images/language/{{lang.value}}.png" style="width:24px;position:absolute;top:1px;left:5px"/>
                  <div style="font-size:14px;float:right;margin-top:4px">{{lang.label}}</div>
              </div>
          </ng-template>
        </p-dropdown>
      </div>
    </div>
  `,
  styles: [`
    #title {
      /*text-align: center;*/
    }

    .item {
      display: inline-block;
    }

    .language-selector-container {
      text-align: center;
    }
  `]
})
export class LanguageSelectorComponent implements OnInit {
  public languages: SelectItem[] = [];
  public selectedLanguage: string;

  public selectLanguageLabel: string;

  constructor(private langService: LanguageService) { }

  ngOnInit() {
    this.languages = [
      { label: 'English', value: Language.ENGLISH },
      { label: 'Русский', value: Language.RUSSIAN }
    ];

    this.selectedLanguage = this.langService.currentLanguage;

    this.langService.currentLanguage$.subscribe(() => {
      this.selectLanguageLabel = this.langService.get(LanguageConstants.SELECT_LANGUAGE);
    });
  }

  changeLang(): void {
    this.langService.currentLanguage$.next(this.selectedLanguage);
    console.log(this.selectedLanguage);
  }
}
