import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-step-buttons',
  template: `
    <div *ngIf="visible === undefined || visible === true" id="buttons-container" class="ui-g-6 ui-lg-4 ui-sm-12 btn-container">
      <div id="left-button-container" class="ui-g-6 ui-sm-12">
        <button
          *ngIf="prevLink"
          pButton
          [routerLink]="[prevLink]"
          [label]="labelPrev"
          [disabled]="disabledPrev"
          (click)="onPrevClick()"
          style="width: 100%"
        ></button>
        <button
          *ngIf="!prevLink"
          pButton
          [label]="labelPrev"
          [disabled]="disabledPrev"
          (click)="onPrevClick()"
          style="width: 100%"
        ></button>
      </div>
      <div id="right-button-container" class="ui-g-6 ui-sm-12">
        <button
          *ngIf="nextLink"
          pButton
          [routerLink]="[nextLink]"
          [label]="labelNext"
          [disabled]="disabledNext"
          (click)="onNextClick()"
          style="width: 100%"
        ></button>
        <button
          *ngIf="!nextLink"
          pButton
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

    #left-button-container,
    #right-button-container {
      height: 100%;
      min-width: 120px;
    }

    @media screen and (min-width: 400px) {
      .btn-container {
          min-width: 300px;
      }
    }

  `]
})
export class StepButtonsComponent implements OnInit {
  labelPrev: string;
  labelNext: string;

  @Input() labelNextStep: string;
  @Input() labelPrevStep: string;

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
        this.labelPrev =
          this.labelPrevStep
          ? this.labelPrevStep
          : this.langService.get(LanguageConstants.BACK);

        this.labelNext =
          this.labelNextStep
          ? this.labelNextStep
          : this.langService.get(LanguageConstants.NEXT);
    });
  }

  onPrevClick(): void {
    this.prevClick.emit(null);
  }

  onNextClick(): void {
    this.nextClick.emit(null);
  }

  getTextWidth(text) {
    // re-use canvas object for better performance
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '16px';
    const metrics = context.measureText(text);
    return metrics.width;
  }
}
