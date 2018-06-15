import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageConstants } from '../../../model/language/language-constants';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';
import { OptionRepresentationMode } from '../option-representation/option-representation-mode';
import { RoutingService } from '../../../services/routing.service';
import { OptionRepresentationComponent } from '../option-representation/option-representation.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-new-option-builder',
  template: `
    <app-option-representation
      #representationModel
      [mode]="representationMode"
    ></app-option-representation>

    <app-step-buttons
      [labelPrevStep]="stepButtonsPrevLabel"
      [labelNextStep]="stepButtonsNextLabel"
      [prevLink]="prevLink"
      (nextClick)="onNext()"
    >
    </app-step-buttons>

  `,
  styles: []
})
export class NewOptionBuilderComponent implements OnInit {
  @ViewChild(OptionRepresentationComponent) representationModel: OptionRepresentationComponent;

  public prevLink = `../${RoutingConstants.CHOOSE_ACTION}`;

  representationMode: OptionRepresentationMode = OptionRepresentationMode.NEW;
  stepButtonsPrevLabel: string;
  stepButtonsNextLabel: string;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService,
    private http: HttpClient,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.stepButtonsPrevLabel = this.langService.get(LanguageConstants.BACK_TO_MENU);
      this.stepButtonsNextLabel = this.langService.get(LanguageConstants.ADD);
    });
  }

  onNext(): void {
    this.http.post(
      '/api/add-parallelizing-method',
      {
        methodModel: this.representationModel.getCurrentOptionModel()
      }
    ).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.error('Error while adding new parallelizing method!');
      }
    });
  }
}
