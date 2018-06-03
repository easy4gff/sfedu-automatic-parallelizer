import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { SourceCodeDialogService } from '../../../../services/source-code-dialog.service';
import { InputTexteditorComponent } from '../input-texteditor/input-texteditor.component';
import { LayoutSwitcherService } from '../../../../services/layout-switcher.service';
import { CodeFile } from '../../../../model/library-code-example/library-example-codefile';

@Component({
  selector: 'app-example-source-code-dialog',
  template: `
  <p-dialog
    [header]="'Source code inspector'"
    [(visible)]="display"
    [modal]="true"
    [appendTo]="'body'"
    [width]="getDialogWidth()"
  >
    <p-tabView (onChange)="onTabChange($event)">
      <p-tabPanel #panel *ngFor="let codefile of codeFiles; let i = index" [selected]="i == 0"
        [header]="codefile.filename"
      >
      <app-input-texteditor [active]="panel.selected" [code]="codefile.code" [readOnly]="true"></app-input-texteditor>
      </p-tabPanel>
    </p-tabView>
  </p-dialog>
  `,
  styles: [`
    /*
      I guess I used ng-deep for a reason, but I don't remember why...
    */
    :host ::ng-deep .CodeMirror {
      height: 800px;
      /*width: 800px;*/
    }

  `]
})
export class ExampleSourceCodeDialogComponent implements OnInit, AfterViewInit {
  // @ViewChild('editor') editor: InputTexteditorComponent;
  @ViewChildren(InputTexteditorComponent) editors: QueryList<InputTexteditorComponent>;

  public display: boolean;
  public codeToShow: string;
  public codeFiles: CodeFile[] = [];

  constructor(
    private sourceCodeDialog: SourceCodeDialogService,
    private cdref: ChangeDetectorRef,
    private layoutSwitcher: LayoutSwitcherService
  ) { }

  ngOnInit() {
    this.sourceCodeDialog.dialogVisible$.subscribe(value => {
      // this.codeToShow = this.sourceCodeDialog.codeToShow;
      this.codeFiles = this.sourceCodeDialog.codefiles;
      this.display = value;
      // this.editor.reload();
      // this.cdref.detectChanges();
      // this.editor.refresh();
      if (this.editors) {
        console.log(this.editors);
        setTimeout(
          () => { this.editors.forEach(editor => editor.refresh()); },
          0
        );
      }
    });
  }

  ngAfterViewInit(): void {
    // if (this.editors) {
    //   console.log(this.editors);
    //   setTimeout(
    //     () => { this.editors.forEach(editor => editor.refresh()); },
    //     0
    //   );
    // }
  }

  getDialogWidth(): number {
    // if (this.layoutSwitcher.isMobileLayout()) {
    //   return 600;
    // } else {
    //   return undefined;
    // }
    return 700;
  }

  onTabChange(event: any): void {
    setTimeout(
      () => { this.editors.filter(editor => editor.active).forEach(editor => {
          editor.refresh();
        }); },
      0
    );
  }
}
