import { Component, Input, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import 'codemirror/mode/clike/clike';

@Component({
  selector: 'app-input-texteditor',
  template: `
  <div style="border: 2px solid darkgray; border-radius: 5px">
    <codemirror
      #editor
      [(ngModel)]="code"
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
    }*/

    /*:host ::ng-deep .CodeMirror-vscrollbar,
    :host ::ng-deep .CodeMirror-hscrollbar {
      display: none !important;
    }*/
  `]
})
export class InputTexteditorComponent implements OnInit {
  @Input() code: string;
  @Input() readOnly = false;
  @Input() active = true;

  @ViewChild('editor') editor: any;

  codeToShow: string;

  public config: Object;

  constructor(private cdref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.codeToShow = '';
    this.config = { lineNumbers: true, mode: 'text/x-csrc', readOnly: this.readOnly, height: 'auto' };
  }

  reload(): void {
    this.cdref.detectChanges();
  }

  refresh(): void {
    const cm: any = this.editor.instance;
    setTimeout(function() {
      if (cm !== null) {
          cm.refresh();

          try {
          // Set cursor to the end
          const posCursor = {line: 0, ch: 0};
          posCursor.line = cm.doc.children[0].lines.length - 1;
          posCursor.ch = cm.doc.children[0].lines[posCursor.line].text.length;

          cm.doc.setCursor(posCursor);
          } catch (e) {

          }
      }
    }, 200);
  }
}
