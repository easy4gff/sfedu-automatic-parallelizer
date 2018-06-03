import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { RoutingService } from '../../../../services/routing.service';
import { ParallelizingOptionType } from '../../../../model/paralleizing-option/parallelizing-option-type';
import { FileInputMethodService } from '../../../../services/file-input-method.service';
import { FileInputMethodType } from '../../../../model/paralleizing-option/parallelizing-option.fileinput-method';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';

@Component({
  selector: 'app-decipher-captcha',
  template: `
    <p-panel [header]="labelConfirm">

      <!-- <div class="upload-container" style="margin-top: 10px">
        <p-button [label]="labelUpload" (onClick)="sendRequest()"></p-button>
      </div> -->
      <app-step-buttons
        [prevLink]="prevLink"
        [labelNextStep]="labelUpload"
        (nextClick)="sendRequest()"
      >
      </app-step-buttons>
    </p-panel>
  `,
  styles: [`
    .upload-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class DecipherCaptchaComponent implements OnInit {
  labelUpload: string;
  labelConfirm: string;

  prevLink: string;

  constructor(
    private langService: LanguageService,
    private optionBuilderService: OptionRequestBuilderService,
    private routingService: RoutingService,
    private inputMethodsService: FileInputMethodService
  ) {}

  ngOnInit() {
    // this.inputMethodsService.currentInputMethodType$.subscribe(method => {
    //   this.calcPrevLink(method);
    //   console.log(this.prevLink);
    // });
    this.calcPrevLink(this.inputMethodsService.currentInputMethodType$.getValue());
    console.log(this.prevLink);

    this.routingService.redirectHomeIfNoOptionSelected();
    if (!this.optionBuilderService.optionData) {
      this.routingService.redirectHome();
    }

    this.langService.currentLanguage$.subscribe(() => {
      this.labelUpload = this.langService.get(LanguageConstants.UPLOAD);
      this.labelConfirm = this.langService.get(LanguageConstants.UPLOAD_CONFIRMATION);
    });
  }

  sendRequest(): void {
    this.optionBuilderService.sendRequest();
    console.log('sendRequest in component OK');
  }

  calcPrevLink(method: FileInputMethodType): void {
    switch (method) {
      case FileInputMethodType.GET_FROM_TEXT_EDITOR:
        this.prevLink = `../${ RoutingConstants.INPUT_FROM_TEXT_EDITOR }`;
        break;
      case FileInputMethodType.LOAD_FROM_FILE_SYSTEM:
        this.prevLink = `../${ RoutingConstants.UPLOAD_CUSTOM_FILE }`;
        break;
      case FileInputMethodType.LOAD_FROM_LIBRARY:
        this.prevLink = `../${ RoutingConstants.CHOOSE_FILE_FROM_LIBRARY }`;
        break;
    }
  }

}
