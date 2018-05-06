import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { RoutingService } from '../../../../services/routing.service';

@Component({
  selector: 'app-decipher-captcha',
  template: `
    <p-panel [header]="labelConfirm">

      <div class="upload-container" style="margin-top: 10px">
        <p-button [label]="labelUpload" (onClick)="sendRequest()"></p-button>
      </div>
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

  constructor(
    private langService: LanguageService,
    private optionBuilderService: OptionRequestBuilderService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
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
  }

}
