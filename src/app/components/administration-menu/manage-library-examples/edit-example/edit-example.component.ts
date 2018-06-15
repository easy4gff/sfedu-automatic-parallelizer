import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';
import { LibraryExample } from '../../../../model/library-code-example/library-example.model';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { HttpClient } from '@angular/common/http';
import { RoutingService } from '../../../../services/routing.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-edit-example',
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

  <app-step-buttons
    [prevLink]="prevLink"
    [labelNextStep]="labelSave"
    (nextClick)="saveExample()"
  ></app-step-buttons>
  `,
  styles: []
})
export class EditExampleComponent implements OnInit, OnDestroy {
  public prevLink = `../${RoutingConstants.MANAGE_OPTION_EXAMPLE}`;

  public labelExampleNameRussian: string;
  public labelExampleNameEnglish: string;
  public exampleNameRussian: string;
  public exampleNameEnglish: string;
  public labelSave: string;

  public libraryExampleId: number;

  private langServiceCurrentLanguage$$: Subscription;
  private chosenExample$$: Subscription;

  constructor(
    private langService: LanguageService,
    private manageExamplesService: ManageLibraryExamplesService,
    private http: HttpClient,
    private routingService: RoutingService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.langServiceCurrentLanguage$$ = this.langService.currentLanguage$.subscribe(() => {
      this.labelExampleNameEnglish = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_ENGLISH);
      this.labelExampleNameRussian = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_RUSSIAN);
      this.labelSave = this.langService.get(LanguageConstants.SAVE);
    });

    this.chosenExample$$ = this.manageExamplesService.chosenExample$.subscribe(example => {
      if (example) {
        this.libraryExampleId = example.id;
        this.exampleNameRussian = example.label.russian;
        this.exampleNameEnglish = example.label.english;
      }
    });
  }

  ngOnDestroy() {
    this.langServiceCurrentLanguage$$.unsubscribe();
    this.chosenExample$$.unsubscribe();
  }

  saveExample(): void {
    this.http.post(
      '/api/edit-library-example',
      {
        exampleId: this.libraryExampleId,
        exampleLabelRussian: this.exampleNameRussian,
        exampleLabelEnglish: this.exampleNameEnglish
      }
    ).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.log('Error while editing library example!');
      }
    });
  }
}
