import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SourceCodeDialogService {
  public dialogVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public codeToShow = '';

  constructor() { }

  showDialog(code: string): void {
    this.dialogVisible$.next(true);
    this.codeToShow = code;
  }

}
