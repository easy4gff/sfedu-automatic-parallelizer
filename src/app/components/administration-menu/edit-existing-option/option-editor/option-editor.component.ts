import { Component, OnInit } from '@angular/core';
import { AdminParallelizingOptionsService } from '../../../../services/administration/admin-parallelizing-options.service';
import { LanguageService } from '../../../../services/language.service';
import { EditExistingOptionService } from '../edit-existing-option.service';

@Component({
  selector: 'app-option-editor',
  template: `
    <app-option-representation
      [optionNameEnglish]="optionNameEnglish"
      [optionNameRussian]="optionNameRussian"
      [selectedCodeExamplesIds]="selectedCodeExamplesIds"
      [selectedInputMethodsIds]="selectedInputMethodsIds"
      [optionStatus]="optionStatus"
    >
    </app-option-representation>
  `,
  styles: []
})
export class OptionEditorComponent implements OnInit {
  selectedInputMethodsIds: number[] = [];
  selectedCodeExamplesIds: number[] = [];
  optionNameRussian = '';
  optionNameEnglish = '';
  optionStatus = false;

  constructor(
    private langService: LanguageService,
    private adminOptionService: AdminParallelizingOptionsService,
    private editOptionService: EditExistingOptionService
  ) { }

  ngOnInit() {
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

}
