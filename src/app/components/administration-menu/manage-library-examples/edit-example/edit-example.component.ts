import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { LanguageConstants } from '../../../../model/language/language-constants';
import { ManageLibraryExamplesService } from '../manage-library-examples.service';
import { LibraryExample } from '../../../../model/library-code-example/library-example.model';

@Component({
  selector: 'app-edit-example',
  template: `
  <div class="gs-flex-centered-hv">
    <table>
      <tr>
        <td>
          <span style="margin-right: 10px">{{ labelExampleNameRussian }}:</span>
        </td>
        <td>
          <input type="text" pInputText [(ngModel)]="exampleNameRussian" />
        </td>
      </tr>
      <tr>
        <td>
          <span style="margin-right: 10px">{{ labelExampleNameEnglish }}:</span>
        </td>
        <td>
          <input type="text" pInputText [(ngModel)]="exampleNameEnglish" />
        </td>
      </tr>
    </table>
  </div>
  `,
  styles: []
})
export class EditExampleComponent implements OnInit, OnDestroy {
  public labelExampleNameRussian: string;
  public labelExampleNameEnglish: string;
  public exampleNameRussian: string;
  public exampleNameEnglish: string;

  public libraryExampleId: number;

  private langServiceCurrentLanguage$$: Subscription;
  private chosenExample$$: Subscription;

  constructor(
    private langService: LanguageService,
    private manageExamplesService: ManageLibraryExamplesService
  ) {}

  ngOnInit() {
    this.langServiceCurrentLanguage$$ = this.langService.currentLanguage$.subscribe(() => {
      this.labelExampleNameEnglish = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_ENGLISH);
      this.labelExampleNameRussian = this.langService.get(LanguageConstants.ENTER_EXAMPLE_NAME_RUSSIAN);
    });

    this.chosenExample$$ = this.manageExamplesService.chosenExample$.subscribe(example => {
      this.libraryExampleId = example.id;
      this.exampleNameEnglish = example.label.russian;
      this.exampleNameEnglish = example.label.english;
    });
  }

  ngOnDestroy() {
    this.langServiceCurrentLanguage$$.unsubscribe();
    this.chosenExample$$.unsubscribe();
  }
}
