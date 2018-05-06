import { Injectable } from '@angular/core';
import { LoginDialogServiceEventType } from '../model/login-dialog/login-dialog-event-type';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginDialogService {
  public events$: Subject<LoginDialogServiceEventType> = new Subject();

  constructor() { }

  public showDialog(): void {
    this.events$.next(LoginDialogServiceEventType.SHOW_DIALOG);
  }

  public hideDialog(): void {
    this.events$.next(LoginDialogServiceEventType.HIDE_DIALOG);
  }

  public showErrInvalidLoginPassword(): void {
    this.events$.next(LoginDialogServiceEventType.INVALID_LOGIN_PASSWORD);
  }
}
