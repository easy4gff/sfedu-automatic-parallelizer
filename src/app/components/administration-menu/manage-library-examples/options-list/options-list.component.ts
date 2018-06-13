import { Component, OnInit } from '@angular/core';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { SelectItem } from 'primeng/primeng';
import { LanguageService } from '../../../../services/language.service';
import { AdminParallelizingOptionsService } from '../../../../services/administration/admin-parallelizing-options.service';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';

@Component({
  selector: 'app-edit-existing-option',
  template: `
    <p-listbox
      [options]="options"
      [(ngModel)]="selectedOption"
      [style]='{"width": "100%"}'
    >
    </p-listbox>

    <app-step-buttons
      [prevLink]="prevLink"
      [nextLink]="nextLink"
      (nextClick)="onNext()"
    ></app-step-buttons>
  `,
  styles: []
})
export class OptionsListComponent implements OnInit {
  public prevLink = `../${RoutingConstants.CHOOSE_ACTION}`;
  public nextLink = `../${RoutingConstants.CHOOSE_EXAMPLE_ACTION}`;
  public options: SelectItem[] = [];
  public selectedOption: { id: number };

  constructor(
    private langService: LanguageService,
    private adminOptionService: AdminParallelizingOptionsService,
    private manageExamplesService: ManageLibraryExamplesService
  ) { }

  ngOnInit() {
    this.adminOptionService.options$
      .subscribe(options => {
        this.options = options
          .map(opt => {
            return {
              label: this.langService.get(opt.title),
              value: {
                id: opt.id
              }
            };
          });

        if (options && options.length !== 0) {
          this.selectedOption = {
            id: options[0].id
          };
        }
      });

    this.langService.currentLanguage$
      .subscribe(lang => {
        this.options = this.options
          .map(opt => {
            return {
              label: this.langService.get(
                this.adminOptionService.options$.getValue().find((option, ind, arr) => {
                  return option.id === opt.value.id;
                }).title
              ),
              value: opt.value
            };
          });
      });
  }

  onNext(): void {
    this.manageExamplesService.chosenOption$.next(
      this.adminOptionService.options$.getValue()
        .find(option => {
          return option.id === this.selectedOption.id;
        })
    );
  }
}
