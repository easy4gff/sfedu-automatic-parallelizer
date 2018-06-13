import { Component, OnInit } from '@angular/core';
import { AdminParallelizingOptionsService } from '../../../../services/administration/admin-parallelizing-options.service';
import { LanguageService } from '../../../../services/language.service';
import { EditExistingOptionService } from '../edit-existing-option.service';
import { OptionRepresentationMode } from '../../option-representation/option-representation-mode';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { RoutingService } from '../../../../services/routing.service';
import { LanguageConstants } from '../../../../model/language/language-constants';

@Component({
  selector: 'app-option-editor',
  template: `
    <app-option-representation
      [mode]="representationMode"
      [optionNameEnglish]="optionNameEnglish"
      [optionNameRussian]="optionNameRussian"
      [selectedCodeExamplesIds]="selectedCodeExamplesIds"
      [selectedInputMethodsIds]="selectedInputMethodsIds"
      [optionStatus]="optionStatus"
    >
    </app-option-representation>

    <app-step-buttons
      [prevLink]="prevLink"
      [labelNextStep]="labelUpload"
      (nextClick)="onNext()"
    >
    </app-step-buttons>
  `,
  styles: []
})
export class OptionEditorComponent implements OnInit {
  representationMode: OptionRepresentationMode = OptionRepresentationMode.EDIT;
  selectedInputMethodsIds: number[] = [];
  selectedCodeExamplesIds: number[] = [];
  optionNameRussian = '';
  optionNameEnglish = '';
  optionStatus = false;
  labelUpload: string;
  prevLink: string = '../' + RoutingConstants.EDIT_EXISTING_OPTION;

  constructor(
    private langService: LanguageService,
    private adminOptionService: AdminParallelizingOptionsService,
    private editOptionService: EditExistingOptionService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.labelUpload = this.langService.get(LanguageConstants.UPLOAD);
    });

    this.editOptionService.chosenOption$.subscribe(option => {
      this.selectedInputMethodsIds = option.fileInputsMethods
        .map(method => {
          return method.type;
        });

      this.selectedCodeExamplesIds = option.libraryExamples
        .map(example => {
          return example.id;
        });

      this.optionNameEnglish = option.title.english;
      this.optionNameRussian = option.title.russian;

      this.optionStatus = option.status;
    });
  }

  onNext(): void {
    // update

    this.routingService.redirectAdminMenu();
  }

}
