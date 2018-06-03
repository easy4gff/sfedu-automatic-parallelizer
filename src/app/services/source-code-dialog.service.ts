import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CodeFile } from '../model/library-code-example/library-example-codefile';

@Injectable()
export class SourceCodeDialogService {
  public dialogVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public codefiles: CodeFile[] = [];

  constructor() { }

  showDialog(codefiles: CodeFile[]): void {
    this.codefiles = codefiles;
    this.dialogVisible$.next(true);
  }

}
