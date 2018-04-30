import { Component, OnInit } from '@angular/core';
import { RoutingConstants } from '../../../routing-utils/routing-constants';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';

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
          name="myfile[]"
          url="./upload.php"
          [chooseLabel]="labelChoose"
          [showUploadButton]="false"
          [showCancelButton]="false"
          (onSelect)="logFiles(upload.files)"
        ></p-fileUpload>
      </div>

      <app-step-buttons
        [prevLink]="prevLink"
        [nextLink]="nextLink"
        [disabledNext]="upload.files === undefined || upload.files.length === 0"
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

  public prevLink = `/${ RoutingConstants.INPUT_FILE_METHOD }`;
  public nextLink = `/${ RoutingConstants.DECIPHER_CAPTCHA }`;

  constructor(
    private langService: LanguageService,
    private optionsService: ParallelizingOptionsService
  ) { }

  ngOnInit() {
    this.optionsService.redirectHomeIfNoOptionSelected();

    this.langService.currentLanguage$.subscribe(() => {
      this.labelLoadFile = this.langService.get(LanguageConstants.LOAD_FILE_FROM_FILESYSTEM);
      this.labelChooseFile = this.langService.get(LanguageConstants.CHOOSE_FILE_TO_LOAD);
      this.labelChoose = this.langService.get(LanguageConstants.CHOOSE);
    });
  }

  logFiles(files: any[]): void {
    console.log(files);
  }

}
