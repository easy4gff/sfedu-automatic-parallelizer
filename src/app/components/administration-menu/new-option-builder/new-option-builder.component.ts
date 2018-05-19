import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageConstants } from '../../../model/language/language-constants';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';

@Component({
  selector: 'app-new-option-builder',
  template: `
    <app-option-representation></app-option-representation>

    <app-step-buttons
      [labelPrevStep]="stepButtonsPrevLabel"
      [labelNextStep]="stepButtonsNextLabel"
      [prevLink]="prevLink"
    >
    </app-step-buttons>

  `,
  styles: []
})
export class NewOptionBuilderComponent implements OnInit {
  public prevLink = `../${RoutingConstants.CHOOSE_ACTION}`;

  stepButtonsPrevLabel: string;
  stepButtonsNextLabel: string;

  constructor(
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.stepButtonsPrevLabel = this.langService.get(LanguageConstants.BACK_TO_MENU);
      this.stepButtonsNextLabel = this.langService.get(LanguageConstants.ADD);
    });
  }

}
