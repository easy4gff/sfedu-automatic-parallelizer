import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { LanguageConstants } from '../../../../model/language/language-constants';

@Component({
  selector: 'app-step-buttons',
  template: `
    <div *ngIf="visible === undefined || visible === true" id="buttons-container" class="ui-g-6 ui-lg-4 ui-sm-12">
      <div id="left-button-container" class="ui-g-6 ui-sm-12">
        <button
          pButton
          [routerLink]="[prevLink]"
          [label]="labelPrev"
          [disabled]="disabledPrev"
          (click)="onPrevClick()"
          style="width: 100%"
        ></button>
      </div>
      <div id="right-button-container" class="ui-g-6 ui-sm-12">
        <button
          pButton
          [routerLink]="[nextLink]"
          [label]="labelNext"
          [disabled]="disabledNext"
          (click)="onNextClick()"
          style="width: 100%"
        ></button>
      </div>
    </div>
  `,
  styles: [`

    #buttons-container {
      text-align: center;
      margin: 0 auto;
      float: none;
    }

    #buttons-container:after {
      content: "";
      display: table;
      clear: both;
    }

    #left-button-container {
      text-align: right;
    }

    #right-button-container {
      text-align: left;
    }
  `]
})
export class StepButtonsComponent implements OnInit {
  labelPrev: string;
  labelNext: string;

  @Input() prevLink: string;
  @Input() nextLink: string;
  @Input() disabledPrev: boolean;
  @Input() disabledNext: boolean;
  @Input() visible: boolean;

  @Output() prevClick: EventEmitter<null> = new EventEmitter();
  @Output() nextClick: EventEmitter<null> = new EventEmitter();

  constructor(private langService: LanguageService) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe(() => {
      this.labelPrev = this.langService.get(LanguageConstants.BACK);
      this.labelNext = this.langService.get(LanguageConstants.NEXT);
    });
  }

  onPrevClick(): void {
    this.prevClick.emit(null);
  }

  onNextClick(): void {
    this.nextClick.emit(null);
  }
}
