import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { RoutingConstants } from '../../../routing-utils/routing-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';

@Component({
  selector: 'app-parallelizing-options',
  template: `
    <p-panel [header]="chooseTransformationModeLabel">

        <p-listbox
          [options]="options"
          [(ngModel)]="selectedOption"
          [style]='{"width": "100%"}'
          (onChange)="changeSelectedMethodGlobal()">
        </p-listbox>

        <app-step-buttons
          [nextLink]="nextLink"
          [disabledPrev]="true"
        ></app-step-buttons>
    </p-panel>

  `,
  styles: [`

    .ui-listbox-item {
      padding: 5px;
    }
  `]
})
export class ParallelizingOptionComponent implements OnInit {
  chooseTransformationModeLabel: string;
  nextLabel: string;

  public nextLink = `/${ RoutingConstants.INPUT_FILE_METHOD }`;
  public options: SelectItem[];
  public selectedOption: { id: string, name: string };

  constructor(
    private optionsService: ParallelizingOptionsService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.chooseTransformationModeLabel = this.langService.get(LanguageConstants.CHOOSE_TRANSFORMATION_MODE);
      this.nextLabel = this.langService.get(LanguageConstants.NEXT);

      this.optionsService.availableOptions$.subscribe(options => {
        this.options = options
        .map(option => {
          return {
            label: this.langService.get(option.title),
            value: {
              id: option.id,
              name: option.id
            }
          };
        });
      });


      if (this.options && this.options.length !== 0) {
        this.selectedOption = this.options[0].value;
      }
    });

    this.changeSelectedMethodGlobal();
  }

  changeSelectedMethodGlobal(): void {
    this.optionsService.chosenOption.next(this.optionsService
      .getAvailableOptions()
      .filter(option => option.id === Number(this.selectedOption.id))[0]);
  }
}
