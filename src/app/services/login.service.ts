import { Injectable } from '@angular/core';
import { LoginDialogService } from './login-dialog.service';
import { AppHttpService } from './app-http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../model/user/user.model';
import { AdministrationActivityService } from './administration/administration-activity.service';

@Injectable()
export class LoginService {
  // public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false); // TODO: lookup for login status in cookie?
  public user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private loginDialogService: LoginDialogService,
    private httpService: AppHttpService,
    private adminActivityService: AdministrationActivityService
  ) { }

  showDialog(): void {
    this.loginDialogService.showDialog();
  }

  hideDialog(): void {
    this.loginDialogService.hideDialog();
  }

  logIn(username: string, password: string): void {
    this.httpService.logIn(username, password).subscribe(response => {
      if (response.success) {
        // this.isLogged$.next(true);
        this.user$.next(new User(username));
        this.hideDialog();

        this.adminActivityService.pullAdminDataFromServer();
      } else {
        this.loginDialogService.showErrInvalidLoginPassword();
      }
    });
  }

  logOut(): void {
    this.httpService.logOut().subscribe(response => {
      if (response.success) {
        // this.isLogged$.next(false);
        this.user$.next(null);
      }
    });
  }

}
