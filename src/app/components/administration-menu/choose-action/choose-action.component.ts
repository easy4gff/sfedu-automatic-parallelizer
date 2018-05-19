import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { LanguageService } from '../../../services/language.service';
import { AdministrationActivityService } from '../../../services/administration/administration-activity.service';
import { RoutingConstants } from '../../../model/routing-utils/routing-constants';
import { AdministrationActionType } from '../../../model/administration-activity/administration-action-enum';

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
    ></app-step-buttons>
  `,
  styles: []
})
export class ChooseActionComponent implements OnInit {
  public options: SelectItem[];
  public selectedOption: { id: AdministrationActionType, name: string };

  constructor(
    private langService: LanguageService,
    private adminService: AdministrationActivityService
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
        nextLink = `${ RoutingConstants.EDIT_EXISTING_OPTION }`;
        break;
    }
    return nextLink;
  }
}
