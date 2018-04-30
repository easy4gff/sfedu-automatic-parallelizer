import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { RoutingConstants } from '../../../routing-utils/routing-constants';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { FileInputMethodType } from '../../../../model/paralleizing-option/parallelizing-option.fileinput-method';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ParallelizingOptionModel } from '../../../../model/paralleizing-option/parallelizing-option.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-file-method',
  template: `
    <p-panel [header]="labelProgramSource">

      <p-listbox
        [options]="options"
        [(ngModel)]="selectedOption"
        [style]='{"width": "100%"}'
        (onChange)="determineNextStep()"
      >
      </p-listbox>

      <!-- <p-button [routerLink]="[nextLink]" class="ui-md-offset-3 ui-lg-offset-3 ui-md-6 ui-lg-6" [label]="labelNext"></p-button>-->
      <app-step-buttons
        [prevLink]="prevLink"
        [nextLink]="nextLink"
      ></app-step-buttons>
    </p-panel>
  `,
  styles: [`

  `]
})
export class InputFileMethodComponent implements OnInit {
  labelProgramSource: string;
  labelNext: string;

  public prevLink = `/${RoutingConstants.PARALLELIZING_OPTIONS}`;
  public nextLink = '';
  public options: SelectItem[];
  public selectedOption: { id: string, name: FileInputMethodType };

  constructor(
    private optionsService: ParallelizingOptionsService,
    private langService: LanguageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.labelProgramSource = this.langService.get(LanguageConstants.CHOOSE_SOURCE_OF_PROGRAM);
      this.labelNext = this.langService.get(LanguageConstants.NEXT);

      const chosenOption: ParallelizingOptionModel = this.optionsService.getChosenOption(true);
      if (chosenOption) {
        this.options = chosenOption.fileInputsMethods
        .map((method, ind, arr) => {
          return {
            label: this.langService.get(method.title),
            value: {
              id: ind,
              name: method.type
            }
          };
        });


        if (this.options && this.options.length !== 0) {
          this.selectedOption = this.options[0].value;
        }

        this.determineNextStep();
      } else {
        this.router.navigateByUrl(RoutingConstants.PARALLELIZING_OPTIONS);
      }
    });
  }

  determineNextStep(): void {
    let nextRoute = '';
    switch (this.selectedOption.name) {
      case FileInputMethodType.GET_FROM_TEXT_EDITOR:
        nextRoute = RoutingConstants.INPUT_FROM_TEXT_EDITOR;
        break;
      case FileInputMethodType.LOAD_FROM_FILE_SYSTEM:
        nextRoute = RoutingConstants.UPLOAD_CUSTOM_FILE;
        break;
      case FileInputMethodType.LOAD_FROM_LIBRARY:
      default:
        nextRoute = RoutingConstants.CHOOSE_FILE_FROM_LIBRARY;
        break;
    }
    this.nextLink = `/${nextRoute}`;
  }

}
