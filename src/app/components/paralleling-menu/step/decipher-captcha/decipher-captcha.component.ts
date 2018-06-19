import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { RoutingService } from '../../../../services/routing.service';
import { ParallelizingOptionType } from '../../../../model/paralleizing-option/parallelizing-option-type';
import { FileInputMethodService } from '../../../../services/file-input-method.service';
import { FileInputMethodType } from '../../../../model/paralleizing-option/parallelizing-option.fileinput-method';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-decipher-captcha',
  template: `
    <p-panel [header]="labelConfirm">
      <p-captcha siteKey="6LdpoV8UAAAAACljc9RQwhfXHkzbd_DetUK_QAHg" (onResponse)="showResponse($event)"></p-captcha>
      <!-- <div class="upload-container" style="margin-top: 10px">
        <p-button [label]="labelUpload" (onClick)="sendRequest()"></p-button>
      </div> -->
      <div class="gs-flex-centered-hv">
        <p-progressSpinner *ngIf="loadingStatus"></p-progressSpinner>
      </div>
      <p-messages [(value)]="resultMessages"></p-messages>
      <app-step-buttons *ngIf="!requestSent"
        [prevLink]="prevLink"
        [labelNextStep]="labelUpload"
        (nextClick)="sendRequest()"
      >
      </app-step-buttons>
      <div class="back-container" *ngIf="resultMessages && resultMessages.length !== 0">
        <button
          pButton
          [label]="toMenu"
          (click)="redirectToMenu()"
          style="padding: 0;"
        >
        </button>
      </div>
    </p-panel>
  `,
  styles: [`
    .upload-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::ng-deep .ui-messages-detail {
      white-space: pre-line;
      word-wrap: break-word;
    }

    :host ::ng-deep .ui-messages {
      /*display: flex !important;*/
      margin: 30px;
    }

    .back-container {
      text-align: center;
      margin: 0 auto;
      float: none;
      margin-top: 17px;
    }

    .back-container:after {
      content: "";
      display: table;
      clear: both;
    }

    :host ::ng-deep .ui-messages-detail {
      display: block !important;
    }

    :host ::ng-deep .ui-messages > ul {
      display: inline !important;
    }
  `]
})
export class DecipherCaptchaComponent implements OnInit, OnDestroy {
  labelUpload: string;
  labelConfirm: string;
  loadingStatus: boolean;
  prevLink: string;
  resultMessages: Message[];
  requestSent = false;
  toMenu: string;
  captchaSolved = false;
  captchaResponse: any;

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
      this.toMenu = this.langService.get(LanguageConstants.BACK_TO_MENU);
    });

    this.optionBuilderService.loadingStatus$.subscribe(status => {
      this.loadingStatus = status;
    });

    this.optionBuilderService.resultMessages$.subscribe(messages => {
      this.resultMessages = messages;
    });
  }

  ngOnDestroy() {
    this.optionBuilderService.resultMessages$.next([]);
  }

  sendRequest(): void {
    this.requestSent = true;
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

  redirectToMenu() {
    this.routingService.redirectHome();
  }

  showResponse(response) {
    console.log(response);
  }

}
