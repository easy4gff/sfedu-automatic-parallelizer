import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { LanguageService } from '../../../services/language.service';
import { AdministrationActivityService } from '../../../services/administration/administration-activity.service';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';
import { AdministrationActionType } from '../../../model/administration-activity/administration-action-enum';
import {
  AdminOptionsModificationsOperationsService
} from '../../../services/administration/admin-options-modifications-operations.service';
import { OptionRepresentationMode } from '../option-representation/option-representation-mode';

@Component({
  selector: 'app-choose-action',
  template: `
    <p-listbox
      [options]="options"
      [(ngModel)]="selectedOption"
      [style]='{"width": "100%"}'
    >
    </p-listbox>

    <app-step-buttons
      [nextLink]="'../' + getNextLink()"
      [disabledNext]="!this.options || this.options.length === 0 || !selectedOption"
      [disabledPrev]="true"
      (nextClick)="pushOperationType()"
    ></app-step-buttons>
  `,
  styles: []
})
export class ChooseActionComponent implements OnInit {
  public options: SelectItem[];
  public selectedOption: { id: AdministrationActionType, name: string };
  public chosenOperation: OptionRepresentationMode;

  constructor(
    private langService: LanguageService,
    private adminService: AdministrationActivityService,
    private modificationsOperationService: AdminOptionsModificationsOperationsService
  ) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(lang => {
      this.options = this.adminService.adminActions
        .map(opt => {
          return {
            label: this.langService.get(opt.label),
            value: {
              id: opt.id
            }
          };
        });

      if (this.options && this.options.length !== 0) {
        this.selectedOption = this.options[0].value;
      }
    });
  }

  getNextLink(): string {
    let nextLink: string;
    switch (this.selectedOption.id) {
      case AdministrationActionType.CREATE_NEW_OPTION:
        nextLink = `${ RoutingConstants.ADD_NEW_OPTION }`;
        break;
      case AdministrationActionType.EDIT_EXISTING_OPTION:
        this.chosenOperation = OptionRepresentationMode.EDIT;
        nextLink = `${ RoutingConstants.EDIT_EXISTING_OPTION }`;
        break;
      case AdministrationActionType.DELETE_EXISTING_OPTION:
        this.chosenOperation = OptionRepresentationMode.DELETE;
        nextLink = `${ RoutingConstants.EDIT_EXISTING_OPTION }`;
        break;
      case AdministrationActionType.MANAGE_LIBRARY_EXAMPLES:
        nextLink = `${ RoutingConstants.MANAGE_LIBRARY_EXAMPLES_OPTION_LIST }`;
        break;
    }
    return nextLink;
  }

  pushOperationType(): void {
    this.modificationsOperationService.currentOperation$.next(this.chosenOperation);
  }
}
