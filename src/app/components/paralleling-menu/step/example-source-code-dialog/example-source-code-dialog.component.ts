import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SourceCodeDialogService } from '../../../../services/source-code-dialog.service';
import { InputTexteditorComponent } from '../input-texteditor/input-texteditor.component';

@Component({
  selector: 'app-example-source-code-dialog',
  template: `
  <p-dialog
    [header]="'Source code inspector'"
    [(visible)]="display"
    [modal]="true"
  >
    <!-- <div id="source-code-container"> -->
      <app-input-texteditor #editor [code]="codeToShow" [readOnly]="true"></app-input-texteditor>
    <!-- </div> -->
  </p-dialog>
  `,
  styles: [`
    :host ::ng-deep .CodeMirror {
      height: 800px;
      width: 800px;
    }

  `]
})
export class ExampleSourceCodeDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: InputTexteditorComponent;

  public display: boolean;
  public codeToShow: string;

  constructor(private sourceCodeDialog: SourceCodeDialogService) { }

  ngOnInit() {
    this.sourceCodeDialog.dialogVisible$.subscribe(value => {
      this.display = value;
      this.codeToShow = this.sourceCodeDialog.codeToShow;
      // this.editor.reload();
    });
  }


  ngAfterViewInit(): void {
  }
}
