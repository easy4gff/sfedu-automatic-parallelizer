import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { HttpClient } from '@angular/common/http';
import { RoutingService } from '../../../../services/routing.service';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-delete-example',
  template: `
    <p>
      Are you sure you want to delete this code example?
    </p>

    <app-step-buttons
      [prevLink]="prevLink"
      (nextClick)="deleteExample()"
    >
    </app-step-buttons>
  `,
  styles: []
})
export class DeleteExampleComponent implements OnInit, OnDestroy {
  public prevLink = '../' + RoutingConstants.MANAGE_OPTION_EXAMPLE;

  constructor(
    private langService: LanguageService,
    private http: HttpClient,
    private routingService: RoutingService,
    private manageExamplesService: ManageLibraryExamplesService,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  deleteExample(): void {
    this.http.post(
      '/api/delete-library-example',
      {
        exampleId: this.manageExamplesService.chosenExample$.getValue().id
      }
    ).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.error('Error while deleting library example');
      }
    });
  }

}
