import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import 'codemirror/mode/clike/clike';

@Component({
  selector: 'app-input-texteditor',
  template: `
  <div style="border: 2px solid darkgray; border-radius: 5px">
    <codemirror [(ngModel)]="code"
      [config]="config"
    >
    </codemirror>
  </div>
  `,
  styles: [`
    /*:host ::ng-deep .CodeMirror {
      height: auto !important;
      width: auto !important;
      overflow: visible !important;
    }

    :host ::ng-deep .CodeMirror-vscrollbar,
    :host ::ng-deep .CodeMirror-hscrollbar {
      display: none !important;
    }*/
  `]
})
export class InputTexteditorComponent implements OnInit {
  @Input() code: string;
  @Input() readOnly = false;

  codeToShow: string;

  public config: Object;

  constructor(private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.codeToShow = '';
    this.config = { lineNumbers: true, mode: 'text/x-csrc', readOnly: this.readOnly };
  }

  reload(): void {
    this.cdref.detectChanges();
  }
}
