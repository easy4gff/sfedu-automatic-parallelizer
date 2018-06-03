import { Component, OnInit } from '@angular/core';
import { DocumentationLanguageConstants } from '../../model/documentation/documentation-language-constants';
import { LanguageService } from '../../services/language.service';
import { LanguageConstant } from '../../model/language/language-constants';
import { DocumentationCodeExamples } from '../../model/documentation/documentation-code-examples';

@Component({
  selector: 'app-documentation',
  template: `
    <p-panel [header]="'Documentation'">
      <div>
        <h1>{{ getConst(dc.ABOUT_PROJECT_HEADER) }}</h1>
        <p>{{ getConst(dc.ABOUT_PROJECT_PARAGRAPH) }}</p>
      </div>

      <div>
        <h1>{{ getConst(dc.INPUT_PROGRAMS_HEADER) }}</h1>
        <p>{{ getConst(dc.INPUT_PROGRAMS_PARAGRAPH) }}</p>
      </div>

      <div>
        <h1>{{ getConst(dc.USER_MANUAL_HEADER) }}</h1>
        <p>{{ getConst(dc.USER_MANUAL_PARAGRAPH) }}</p>
      </div>

      <div>
        <h1>{{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_HEADER) }}</h1>
        <p>{{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_P1) }}</p>
        <p style="white-space: normal">#pragma ops distribute data(
          &lt;{{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_CODE_1) }}&gt;,
          &lt;dim<sub>i</sub>&gt;,
          P,
          &lt;d<sub>i</sub>&gt;)
        </p>
        <ul>
          <li>dim<sub>i</sub> - {{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_1) }}</li>
          <li>P - {{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_2) }}</li>
          <li>d<sub>i</sub> - {{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_PARAM_DESC_3) }}</li>
        </ul>
        <p>{{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_P2) }}</p>
        <p style="white-space: normal">
          <b>{{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_EXAMPLE) }}.</b>
          {{ getConst(dc.AUTOMATIC_DATA_DISTRIBUTION_FOR_CACHE_MEMORY_EXAMPLE_DESC) }}
        </p>

        <app-input-texteditor
          [code]="codeExamples.ex1"
          [readOnly]="true"
        ></app-input-texteditor>
      </div>
    </p-panel>
  `,
  styles: [`
    div p {
      white-space: pre-line;
    }

    :host ::ng-deep .CodeMirror {
      height: auto !important;
      /*width: auto !important;
      overflow: visible !important;*/
    }
  `]
})
export class DocumentationComponent implements OnInit {
  public dc: DocumentationLanguageConstants = new DocumentationLanguageConstants();
  public codeExamples: DocumentationCodeExamples = new DocumentationCodeExamples();

  constructor(private langService: LanguageService) { }

  ngOnInit() {
  }

  getConst(langConst: LanguageConstant): string {
    return this.langService.get(langConst);
  }

}
