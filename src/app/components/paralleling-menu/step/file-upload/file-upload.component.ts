import { Component, OnInit } from '@angular/core';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { RoutingService } from '../../../../services/routing.service';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { ParallelizingOptionDataUserFiles } from '../../../../model/paralleizing-option/parallelizing-option-data';

@Component({
  selector: 'app-file-upload',
  template: `
    <p-panel [header]="labelLoadFile">
      <div>
        <!-- <span class="label-text">Выберите файл для загрузки:</span> -->
        <div class="label-container">
        <h4>{{ labelChooseFile }}:</h4>
        </div>
        <p-fileUpload
          #upload
          url="./upload.php"
          [chooseLabel]="labelChoose"
          [showUploadButton]="false"
          [showCancelButton]="false"
          [multiple]="true"
          (onSelect)="setFiles(upload.files)"
        ></p-fileUpload>
      </div>

      <app-step-buttons
        [prevLink]="prevLink"
        [nextLink]="nextLink"
        [disabledNext]="upload.files === undefined || upload.files.length === 0"
        (nextClick)="onNext()"
      ></app-step-buttons>
    </p-panel>


  `,
  styles: [`

    .label-container {
      text-align: center;
    }
  `]
})
export class FileUploadComponent implements OnInit {
  labelLoadFile: string;
  labelChooseFile: string;
  labelChoose: string;

  files: File[];

  public prevLink = `../${ RoutingConstants.INPUT_FILE_METHOD }`;
  public nextLink = `../${ RoutingConstants.DECIPHER_CAPTCHA }`;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService,
    private optionBuilderService: OptionRequestBuilderService
  ) { }

  ngOnInit() {
    this.routingService.redirectHomeIfNoOptionSelected();

    this.langService.currentLanguage$.subscribe(() => {
      this.labelLoadFile = this.langService.get(LanguageConstants.LOAD_FILE_FROM_FILESYSTEM);
      this.labelChooseFile = this.langService.get(LanguageConstants.CHOOSE_FILE_TO_LOAD);
      this.labelChoose = this.langService.get(LanguageConstants.CHOOSE);
    });
  }

  setFiles(files: File[]): void {
    console.log(files);
    this.files = files;
  }

  onNext(): void {
    this.optionBuilderService.optionData = new ParallelizingOptionDataUserFiles(this.files);
  }
}
