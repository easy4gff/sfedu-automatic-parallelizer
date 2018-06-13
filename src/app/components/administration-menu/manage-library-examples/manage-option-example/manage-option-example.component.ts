import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { AdminCodeExamplesService } from '../../../../services/administration/admin-code-examples.service';
import { LanguageService } from '../../../../services/language.service';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { AdminParallelizingOptionsService } from '../../../../services/administration/admin-parallelizing-options.service';

@Component({
  selector: 'app-manage-option-example',
  template: `
  <p-listbox
    [options]="optionCodeExamples"
    [(ngModel)]="selectedOption"
    [style]='{"width": "100%"}'
  >
  </p-listbox>

  <app-step-buttons
    [prevLink]="prevLink"
    [nextLink]="nextLink"
  ></app-step-buttons>
  `,
  styles: []
})
export class ManageOptionExampleComponent implements OnInit {
  public optionCodeExamples: SelectItem[] = [];
  public selectedOption: { id: number };

  public prevLink = `../${RoutingConstants.CHOOSE_EXAMPLE_ACTION}`;
  public nextLink: string; // EDIT ONLY LABELS AHAHAAH LOL OMG CUNNING ZHEKA

  constructor(
    private adminCodeExamplesService: AdminCodeExamplesService,
    private langService: LanguageService,
    private manageExamplesService: ManageLibraryExamplesService,
    private adminOptionsService: AdminParallelizingOptionsService
  ) { }

  // ngOnInit() {
  //   this.adminCodeExamplesService.examples$.subscribe(examples => {
  //     this.optionCodeExamples = examples
  //       .filter(example =>
  //         this.manageExamplesService.chosenOption$.getValue().libraryExamples.find(ex => example.id === ex.id) !== undefined)
  //       .map(ex => {
  //         return {
  //           label: this.langService.get(ex.label),
  //           value: {
  //             id: ex.id
  //           }
  //         };
  //       });
  //     }
  //   );
  // }

  ngOnInit() {
    this.adminOptionsService.options$.subscribe(options => {
      this.optionCodeExamples =
        options.find(option => option.id === this.manageExamplesService.chosenOption$.getValue().id).libraryExamples
               .map(ex => {
                  return {
                    label: this.langService.get(ex.label),
                    value: {
                      id: ex.id
                    }
                  };
                });

      }
    );
  }

}
