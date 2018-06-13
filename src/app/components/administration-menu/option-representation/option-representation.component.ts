import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageConstants, LanguageConstant } from '../../../model/language/language-constants';
import { OptionRepresentationMode } from './option-representation-mode';
import { SelectItem } from 'primeng/primeng';
import { FileInputMethodService } from '../../../services/file-input-method.service';
import { AdminCodeExamplesService } from '../../../services/administration/admin-code-examples.service';
import 'rxjs/add/operator/filter';
import { EditExistingOptionService } from '../edit-existing-option/edit-existing-option.service';

@Component({
  selector: 'app-option-representation',
  template: `
    <div>
      <p-accordion [activeIndex]="selectedAccordionIndex" (onOpen)="onAccordionTabOpen($event)">
        <p-accordionTab [header]="labelChooseOptionName">
          <div class="gs-flex-centered-hv">
            <table>
              <tr>
                <td>
                  <span style="margin-right: 10px">{{ labelOptionNameRussian }}:</span>
                </td>
                <td>
                  <input type="text" pInputText [(ngModel)]="optionNameRussian" />
                </td>
              </tr>
              <tr>
                <td>
                  <span style="margin-right: 10px">{{ labelOptionNameEnglish }}:</span>
                </td>
                <td>
                  <input type="text" pInputText [(ngModel)]="optionNameEnglish" />
                </td>
              </tr>
            </table>
          </div>
          <app-step-buttons
            [disabledPrev]="true"
            (nextClick)="onNextAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>

        <p-accordionTab [header]="labelOptionInputMethods">

          <div class="gs-flex-centered-hv">
              <p-listbox
                [options]="availableInputMethods"
                [multiple]="true"
                [(ngModel)]="selectedInputMethods"
                [metaKeySelection]="false"
                [checkbox]="true"
                [style]="{'width': '100%'}"
                (onChange)="logOpts()"
              >
              </p-listbox>
          </div>
          <app-step-buttons
            (prevClick)="onPrevAccordionTab()"
            (nextClick)="onNextAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>

        <p-accordionTab [header]="labelCodeExamples" *ngIf="editMode">

          <div class="gs-flex-centered-hv">
              <p-listbox
                id="examples-listbox"
                [options]="availableCodeExamples"
                [multiple]="true"
                [(ngModel)]="selectedCodeExamples"
                [metaKeySelection]="false"
                [checkbox]="true"
                [style]="{'width': '100%'}"
              >
              </p-listbox>
          </div>
          <app-step-buttons
            (prevClick)="onPrevAccordionTab()"
            (nextClick)="onNextAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>
        <p-accordionTab [header]="'Командная строка'">
          <span style="margin-right: 10px">{{ labelOptionNameRussian }}:</span>
          <input type="text" pInputText [(ngModel)]="optionNameRussian" />

          <app-step-buttons
            (prevClick)="onPrevAccordionTab()"
            (nextClick)="onNextAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>
        <p-accordionTab [header]="'Расширения производимых файлов'">
          <app-step-buttons
            (prevClick)="onPrevAccordionTab()"
            (nextClick)="onNextAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>

        <p-accordionTab [header]="labelOptionStatusHeader">

          <div class="gs-flex-centered-hv">
            <p-inputSwitch
              [onLabel]="labelOptionStatusActive"
              [offLabel]="labelOptionStatusDisabled"
              [(ngModel)]="optionStatus"
            ></p-inputSwitch>
          </div>
          <app-step-buttons
            [disabledNext]="true"
            (prevClick)="onPrevAccordionTab()"
          ></app-step-buttons>
        </p-accordionTab>
      </p-accordion>

    </div>
  `,
  styles: [`
    :host ::ng-deep #examples-listbox .ui-listbox-list {
      max-height: 300px;
      overflow: scroll;
    }
  `]
})
export class OptionRepresentationComponent implements OnInit {
  // TODO mode: edit/new
  @Input() mode: OptionRepresentationMode;
  public editMode: boolean;

  @Input() selectedInputMethodsIds: number[] = [];
  @Input() selectedCodeExamplesIds: number[] = [];
  @Input() optionNameRussian = '';
  @Input() optionNameEnglish = '';
  @Input() optionStatus = false;

  public labelChooseOptionName: string;
  public labelOptionNameRussian: string;
  public labelOptionNameEnglish: string;

  public labelOptionStatusHeader: string;
  public labelOptionStatusActive: string;
  public labelOptionStatusDisabled: string;

  public labelOptionInputMethods: string;
  public availableInputMethods: SelectItem[];
  public selectedInputMethods: { id: number}[];

  public labelCodeExamples: string;
  public availableCodeExamples: SelectItem[];
  public selectedCodeExamples: { id: number }[];

  public labelCommandLineHeader: string;
  public labelCommandLine: string;
  public commandLine: string;

  public selectedAccordionIndex: number;

  constructor(
    private langService: LanguageService,
    private fileInputMethodsService: FileInputMethodService,
    private adminCodeExamplesService: AdminCodeExamplesService,
    private editExistingOptionService: EditExistingOptionService
  ) { }

  ngOnInit() {
    this.editMode = this.mode === OptionRepresentationMode.EDIT;
    this.selectedInputMethods = this.selectedInputMethodsIds
      .map(id => {
        return {
          id: id
        };
      });

    this.selectedCodeExamples = this.selectedCodeExamplesIds
      .map(id => {
        return {
          id: id
        };
      });

    if (this.editMode) {
      this.adminCodeExamplesService.examples$.subscribe(examples => {
          this.availableCodeExamples = examples
            .filter(example =>
              this.editExistingOptionService.chosenOption$.getValue().libraryExamples.find(ex => example.id === ex.id) !== undefined)
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

    this.langService.currentLanguage$.subscribe(lang => {
      this.labelChooseOptionName = this.langService.get(LanguageConstants.CHOOSE_OPTION_NAME);
      this.labelOptionNameRussian = this.langService.get(LanguageConstants.TYPE_OPTION_NAME_IN_RUSSIAN);
      this.labelOptionNameEnglish = this.langService.get(LanguageConstants.TYPE_OPTION_NAME_IN_ENGLISH);

      this.labelOptionStatusHeader = this.langService.get(LanguageConstants.STATUS);
      this.labelOptionStatusActive = this.langService.get(LanguageConstants.PARALLELIZING_OPTION_STATUS_ACTIVE);
      this.labelOptionStatusDisabled = this.langService.get(LanguageConstants.PARALLELIZING_OPTION_STATUS_DISABLED);

      this.labelOptionInputMethods = this.langService.get(LanguageConstants.PROGRAM_INPUT_METHODS);

      this.labelCodeExamples = this.langService.get(LanguageConstants.CODE_EXAMPLES);

      this.availableInputMethods = this.fileInputMethodsService.fileInputMethods
        .map((inputMethod, ind, arr) => {
          return {
            label: this.langService.get(inputMethod.title),
            value: {
              id: inputMethod.type
            }
          };
        });

    });
  }

  logOpts(): void {
    console.log(this.selectedInputMethods);
  }

  onAccordionTabOpen(event: any): void {
    this.selectedAccordionIndex = event.index;
  }

  onPrevAccordionTab() {
    this.selectedAccordionIndex -= 1;
  }
  onNextAccordionTab() {
    this.selectedAccordionIndex += 1;
  }

}
