import { Component, OnInit } from '@angular/core';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';
import { LanguageService } from '../../../services/language.service';
import { RoutingService } from '../../../services/routing.service';
import { LanguageConstants } from '../../../model/language/language-constants';
import { HttpClient } from '@angular/common/http';
import { EditExistingOptionService } from '../edit-existing-option/edit-existing-option.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-delete-existing-option',
  template: `
    <p>
      {{ labelDeleteConfirmation }}
    </p>
    <app-step-buttons
      [prevLink]="prevLink"
      [labelNextStep]="labelNextStep"
      (nextClick)="deleteMethod()"
    >
    </app-step-buttons>
  `,
  styles: []
})
export class DeleteExistingOptionComponent implements OnInit {
  public labelNextStep: string;
  public prevLink = '../' + RoutingConstants.EDIT_EXISTING_OPTION;
  public labelDeleteConfirmation: string;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService,
    private http: HttpClient,
    private editOptionService: EditExistingOptionService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.labelNextStep = this.langService.get(LanguageConstants.DELETE);
      this.labelDeleteConfirmation = this.langService.get(LanguageConstants.ARE_U_SURE_YOU_WANT_DELETE_METHOD);
    });
  }

  deleteMethod() {
    // http call
    this.http.post(
      '/api/delete-parallelizing-method',
      {
        methodId: this.editOptionService.chosenOption$.getValue().id
      }
    ).subscribe((response: any) => {
      if (response.status) {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.error('Error while deleting parallelizing method!');
      }
    });
  }
}
