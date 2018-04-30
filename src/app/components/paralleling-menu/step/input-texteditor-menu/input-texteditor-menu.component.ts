import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { RoutingConstants } from '../../../routing-utils/routing-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';

@Component({
  selector: 'app-input-texteditor-menu',
  template: `
    <p-panel header="Ввод текста в редакторе">
      <!-- <span class="label-text">Выберите файл для загрузки:</span> -->
      <div class="label-container">
        <span>{{ labelUserHint }}
        </span>
      </div>

      <app-input-texteditor [code]="code"></app-input-texteditor>

      <app-step-buttons
        [prevLink]="prevLink"
        [nextLink]="nextLink"
      ></app-step-buttons>
    </p-panel>
  `,
  styles: [`
    span {
      display: block;
      margin: 10px;
    }

    :host ::ng-deep .CodeMirror {
      height: auto !important;
      width: auto !important;
    }
  `]
})
export class InputTexteditorMenuComponent implements OnInit {
  labelUserHint: string;
  code = `
#include <stdio.h>
#include <string.h>

int main()
{
  const char * msg = "Hello world!\\n";
  int printf_res = printf(msg);
  if (printf_res < strlen(msg))
  {
    return 1;
  } else {
    return 0;
  }
}
  `;

  public prevLink = `/${RoutingConstants.INPUT_FILE_METHOD}`;
  public nextLink = `/${RoutingConstants.DECIPHER_CAPTCHA}`;

  constructor(
    private langService: LanguageService,
    private optionsService: ParallelizingOptionsService
  ) { }

  ngOnInit() {
    this.optionsService.redirectHomeIfNoOptionSelected();

    this.langService.currentLanguage$.subscribe(() => {
      this.labelUserHint = this.langService.get(LanguageConstants.TEXT_EDITOR_MENU_HINT_FOR_USER);
    });
  }
}
