import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageConstants } from '../../../model/language/language-constants';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';
import { OptionRepresentationMode } from '../option-representation/option-representation-mode';
import { RoutingService } from '../../../services/routing.service';

@Component({
  selector: 'app-new-option-builder',
  template: `
    <app-option-representation
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
  public prevLink = `../${RoutingConstants.CHOOSE_ACTION}`;

  representationMode: OptionRepresentationMode = OptionRepresentationMode.NEW;
  stepButtonsPrevLabel: string;
  stepButtonsNextLabel: string;

  constructor(
    private langService: LanguageService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.stepButtonsPrevLabel = this.langService.get(LanguageConstants.BACK_TO_MENU);
      this.stepButtonsNextLabel = this.langService.get(LanguageConstants.ADD);
    });
  }

  onNext(): void {
    this.routingService.redirectAdminMenu();
  }
}
