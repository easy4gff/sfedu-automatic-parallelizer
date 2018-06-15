import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminParallelizingOptionsService } from '../../../../services/administration/admin-parallelizing-options.service';
import { LanguageService } from '../../../../services/language.service';
import { EditExistingOptionService } from '../edit-existing-option.service';
import { OptionRepresentationMode } from '../../option-representation/option-representation-mode';
import { RoutingConstants } from '../../../../model/routing-utils/routing-constants';
import { RoutingService } from '../../../../services/routing.service';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { HttpClient } from '@angular/common/http';
import { OptionRepresentationComponent } from '../../option-representation/option-representation.component';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-option-editor',
  template: `
    <app-option-representation
      [id]="optionId"
      [mode]="representationMode"
      [optionNameEnglish]="optionNameEnglish"
      [optionNameRussian]="optionNameRussian"
      [selectedCodeExamplesIds]="selectedCodeExamplesIds"
      [selectedInputMethodsIds]="selectedInputMethodsIds"
      [optionStatus]="optionStatus"
      [commandLine]="cmdLine"
      [resultExtensions]="resultExtensions"
      [producingExtensions]="producingExtensions"
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
  @ViewChild(OptionRepresentationComponent) representationModel: OptionRepresentationComponent;

  representationMode: OptionRepresentationMode = OptionRepresentationMode.EDIT;
  selectedInputMethodsIds: number[] = [];
  selectedCodeExamplesIds: number[] = [];
  optionId: number;
  optionNameRussian = '';
  optionNameEnglish = '';
  optionStatus = false;
  cmdLine: string;
  resultExtensions: string[];
  producingExtensions: string[];
  labelUpload: string;
  prevLink: string = '../' + RoutingConstants.EDIT_EXISTING_OPTION;

  constructor(
    private langService: LanguageService,
    private adminOptionService: AdminParallelizingOptionsService,
    private editOptionService: EditExistingOptionService,
    private routingService: RoutingService,
    private http: HttpClient,
    private appService: AppService
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
      this.optionId = option.id;
      this.optionStatus = option.status;
      this.cmdLine = option.commandLine;
      this.resultExtensions = option.resultExtensions;
      this.producingExtensions = option.producingExtensions;
    });
  }

  onNext(): void {
    // update
    this.http.post(
      '/api/edit-parallelizing-method',
      {
        methodModel: this.representationModel.getCurrentOptionModel()
      }
    ).subscribe((response: any) => {
      if (response.status === 'OK') {
        this.routingService.redirectAdminMenu();
        this.appService.reloadOptions();
      } else {
        console.error('Error while modifying parallelizing option');
      }
    });
  }

}
