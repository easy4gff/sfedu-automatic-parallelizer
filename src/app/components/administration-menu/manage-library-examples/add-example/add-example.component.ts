import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { RoutingService } from '../../../../services/routing.service';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../../services/app.service';

const SERVER_API = '/api';
const SERVICE_CONTROLLER = '/add-library-example';

@Component({
  selector: 'app-add-example',
  template: `
  <div class="gs-flex-centered-hv">
    <table>
      <tr>
        <td>
          <span style="margin-right: 10px">{{ labelExampleNameRussian }}:</span>
        </td>
        <td>
          <input type="text" pInputText [(ngModel)]="exampleNameRussian" />
        </td>
      </tr>
      <tr>
        <td>
          <span style="margin-right: 10px">{{ labelExampleNameEnglish }}:</span>
        </td>
        <td>
          <input type="text" pInputText [(ngModel)]="exampleNameEnglish" />
        </td>
      </tr>
    </table>
  </div>

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
    [disabledNext]="upload.files === undefined || upload.files.length === 0 || !exampleNameRussian || !exampleNameEnglish"
    (nextClick)="uploadExamples()"
  ></app-step-buttons>
  `,
  styles: []
})
export class AddExampleComponent implements OnInit, OnDestroy {
  public prevLink = '../' + RoutingConstants.CHOOSE_EXAMPLE_ACTION;

  public labelChoose: string;
  public labelChooseFile: string;
  public labelExampleNameRussian: string;
  public labelExampleNameEnglish: string;

  public exampleNameRussian: string;
  public exampleNameEnglish: string;

  public files: File[];

  private langServiceCurrentLanguage$$: Subscription;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService,
    private http: HttpClient,
    private manageExamplesService: ManageLibraryExamplesService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.langServiceCurrentLanguage$$ = this.langService.currentLanguage$.subscribe(() => {
      this.labelChoose = this.langService.get(LanguageConstants.CHOOSE);
      this.labelChooseFile = this.langService.get(LanguageConstants.CHOOSE_FILE_TO_LOAD);
      this.labelExampleNameEnglish = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_ENGLISH);
      this.labelExampleNameRussian = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_RUSSIAN);
    });
  }

  ngOnDestroy() {
    this.langServiceCurrentLanguage$$.unsubscribe();
  }

  setFiles(files: File[]): void {
    this.files = files;
  }

  uploadExamples(): void {
    const formData: FormData = new FormData();
    formData.append('methodId', this.manageExamplesService.chosenOption$.getValue().id.toString());
    formData.append('exampleLabelRussian', this.exampleNameRussian);
    formData.append('exampleLabelEnglish', this.exampleNameEnglish);
    formData.append('countFiles', this.files.length.toString());
    for (let i = 0; i < this.files.length; ++i) {
      formData.append('file' + i, this.files[i], this.files[i].name);
    }

    this.http.post(
      SERVER_API + SERVICE_CONTROLLER,
      formData
    ).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.error('Server error while adding library example!');
      }
    });

  }
}
