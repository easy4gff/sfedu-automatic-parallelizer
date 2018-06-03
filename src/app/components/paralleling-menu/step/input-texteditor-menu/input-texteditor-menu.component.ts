import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { RoutingService } from '../../../../services/routing.service';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { ParallelizingOptionDataSourceCode } from '../../../../model/paralleizing-option/parallelizing-option-data';
import { InputTexteditorComponent } from '../input-texteditor/input-texteditor.component';

@Component({
  selector: 'app-input-texteditor-menu',
  template: `
    <p-panel header="Ввод текста в редакторе">
      <!-- <span class="label-text">Выберите файл для загрузки:</span> -->
      <div class="label-container">
        <span>{{ labelUserHint }}
        </span>
      </div>

      <app-input-texteditor #editor [code]="code"></app-input-texteditor>

      <app-step-buttons
        [prevLink]="prevLink"
        [nextLink]="nextLink"
        (nextClick)="onNext()"
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
  @ViewChild('editor') editor: InputTexteditorComponent;

  public prevLink = `../${RoutingConstants.INPUT_FILE_METHOD}`;
  public nextLink = `../${RoutingConstants.DECIPHER_CAPTCHA}`;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService,
    private optionBuilderService: OptionRequestBuilderService
  ) { }

  ngOnInit() {
    this.routingService.redirectHomeIfNoOptionSelected();

    this.langService.currentLanguage$.subscribe(() => {
      this.labelUserHint = this.langService.get(LanguageConstants.TEXT_EDITOR_MENU_HINT_FOR_USER);
    });
  }

  onNext(): void {
    this.optionBuilderService.optionData = new ParallelizingOptionDataSourceCode(this.editor.code);
  }
}
