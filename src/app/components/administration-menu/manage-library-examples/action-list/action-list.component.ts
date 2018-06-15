import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { ActionListItems, ExampleManagementActionType } from './action-list-items';
import { LanguageService } from '../../../../services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem } from 'primeng/primeng';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';

@Component({
  selector: 'app-action-list',
  template: `
  <p-listbox
    [options]="options"
    [(ngModel)]="selectedOption"
    [style]='{"width": "100%"}'
    (onChange)="determineNextLink()"
  >
  </p-listbox>

  <app-step-buttons
    [prevLink]="prevLink"
    [nextLink]="nextLink"
  ></app-step-buttons>
  `,
  styles: []
})
export class ActionListComponent implements OnInit, OnDestroy {
  public prevLink = `../${RoutingConstants.MANAGE_LIBRARY_EXAMPLES_OPTION_LIST}`;
  public nextLink: string;
  public options: SelectItem[] = [];
  public selectedOption: { id: ExampleManagementActionType};

  private langServiceCurrentLanguage$$: Subscription;

  constructor(
    private langService: LanguageService,
    private manageExamplesService: ManageLibraryExamplesService
  ) { }

  ngOnInit() {
    this.langServiceCurrentLanguage$$ = this.langService.currentLanguage$.subscribe(() => {
      this.options = ActionListItems.items.map(item => {
        return {
          value: {
            id: item.type
          },
          label: this.langService.get(item.label)
        };
      });
    });
  }

  ngOnDestroy() {
    this.langServiceCurrentLanguage$$.unsubscribe();
  }

  determineNextLink(): void {
    // routing logic
    switch (this.selectedOption.id) {
      case ExampleManagementActionType.ADD:
        this.nextLink = '../' + RoutingConstants.ADD_NEW_LIBRARY_EXAMPLE;
        break;
      case ExampleManagementActionType.EDIT:
      case ExampleManagementActionType.DELETE:
        this.nextLink = '../' + RoutingConstants.MANAGE_OPTION_EXAMPLE;
        break;
      default:
        // skip unrecognized types
    }
    this.manageExamplesService.currentAction$.next(this.selectedOption.id);
  }
}
