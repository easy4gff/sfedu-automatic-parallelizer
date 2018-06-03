import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { SelectItem } from 'primeng/primeng';
import { ParallelizingOptionsService } from '../../../../services/parallelizing-options.service';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { SourceCodeDialogService } from '../../../../services/source-code-dialog.service';
import { ParallelizingOptionModel } from '../../../../model/paralleizing-option/parallelizing-option.model';
import { Router } from '@angular/router';
import { OptionRequestBuilderService } from '../../../../services/option-request-builder.service';
import { ParallelizingOptionDataLibraryExampleId } from '../../../../model/paralleizing-option/parallelizing-option-data';
import { CodeFile } from '../../../../model/library-code-example/library-example-codefile';

@Component({
  selector: 'app-library-examples',
  template: `
  <p-panel [header]="labelChooseExample">

    <p-listbox
      [options]="options"
      [(ngModel)]="selectedOption"
      [style]='{"width": "100%"}'
    >
    </p-listbox>

    <p-button
      *ngIf="this.selectedOption"
      class="ui-md-6 ui-lg-6"
      [label]="labelShowSourceCode"
      (click)="showSourceCode()"
    ></p-button>

    <app-step-buttons
      [prevLink]="prevLink"
      [nextLink]="nextLink"
      [disabledNext]="selectedOption === undefined"
      (nextClick)="changeExampleGlobal()"
    ></app-step-buttons>

  </p-panel>
  `,
  styles: []
})
export class LibraryExamplesComponent implements OnInit {
  labelChooseExample: string;
  labelShowSourceCode: string;

  public prevLink = `../${RoutingConstants.INPUT_FILE_METHOD}`;
  public nextLink = `../${RoutingConstants.DECIPHER_CAPTCHA}`;
  public options: SelectItem[];
  public selectedOption: { id: number, codefiles: CodeFile[] };

  constructor(
    private optionsService: ParallelizingOptionsService,
    private langService: LanguageService,
    private sourceCodeDialogService: SourceCodeDialogService,
    private router: Router,
    private optBuilderService: OptionRequestBuilderService
  ) { }

  ngOnInit() {

    this.langService.currentLanguage$.subscribe(() => {
      this.labelChooseExample = this.langService.get(LanguageConstants.CHOOSE_FILE_FROM_LIBRARY);
      this.labelShowSourceCode = this.langService.get(LanguageConstants.SHOW_SOURCE_CODE);

      const chosenOption: ParallelizingOptionModel = this.optionsService.getChosenOption(true);
      if (chosenOption) {
        this.options = chosenOption.libraryExamples
        .map((sample, index, arr) => {
          return {
            label: this.langService.get(sample.label),
            value: {
              id: sample.id, // required for p-listbox
              codefiles: sample.codefiles
            }
          };
        });
      } else {
        this.router.navigateByUrl(RoutingConstants.PARALLELIZING_OPTIONS);
      }
    });
  }

  showSourceCode(): void {
    this.sourceCodeDialogService.showDialog(this.selectedOption.codefiles);
  }

  changeExampleGlobal(): void {
    this.optBuilderService.optionData = new ParallelizingOptionDataLibraryExampleId(this.selectedOption.id);
  }
}
