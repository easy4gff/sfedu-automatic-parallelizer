import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../services/app-http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoginDialogService } from '../../services/login-dialog.service';
import { LoginService } from '../../services/login.service';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { User } from '../../model/user/user.model';
import { RoutingConstants } from '../../model/routing-utils/routing-constants';

@Component({
  selector: 'app-user-panel',
  template: `
  <p-panel>
    <div style="text-align: center">
      <span>{{ labelYouAreAuthorizedAs }}: <b>{{ username }}</b></span>
    </div>
    <div class="buttons-container">
      <button
        *ngIf="!isLogged"
        pButton
        [label]="labelLogin"
        (click)="showLoginDialog()"
      >
      </button>

      <button
        *ngIf="isLogged"
        pButton
        [label]="labelLogout"
        (click)="logOut()"
      >
      </button>

      <button
        pButton
        [label]="'Test session'"
        (click)="test()"
      >
      </button>

      <button
        *ngIf="isLogged"
        pButton
        [label]="labelManageOptions"
        [routerLink]="linkAdministrationMenu"
      >
      </button>

    </div>
  </p-panel>
  `,
  styles: [`
    .userinfo-component-container {
      height: 250px;
      border: 2px solid red;
    }

    .buttons-container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      width: 100%;
      max-width: 200px;
    }
  `]
})
export class UserPanelComponent implements OnInit {
  labelLogin: string;
  labelLogout: string;
  labelYouAreAuthorizedAs: string;
  labelManageOptions: string;

  linkAdministrationMenu = `/${RoutingConstants.ADMINISTRATION_MENU}`;

  username: string;
  isLogged: boolean;

  constructor(
    private httpService: AppHttpService,
    private loginService: LoginService,
    private languageService: LanguageService
  ) {

  }

  ngOnInit() {
    // TODO: complete
    combineLatest(this.languageService.currentLanguage$, this.loginService.user$)
      .subscribe((value: [string, User]) => {
        if (value[1] !== null) {
          this.username = value[1].username;
          this.isLogged = true;
        } else {
          this.username = this.languageService.get(LanguageConstants.GUEST);
          this.isLogged = false;
        }

        this.labelLogin = this.languageService.get(LanguageConstants.LOG_IN_VERB);
        this.labelLogout = this.languageService.get(LanguageConstants.LOG_OUT);
        this.labelYouAreAuthorizedAs = this.languageService.get(LanguageConstants.YOU_ARE_AUTHORIZED_AS);
        this.labelManageOptions = this.languageService.get(LanguageConstants.MANAGE_OPTIONS);
      });

  }

  showLoginDialog(): void {
    this.loginService.showDialog();
  }

  logOut(): void {
    this.loginService.logOut();
  }

  // TODO: remove
  test() {
    this.httpService
      .parallelize()
      .subscribe(res => {
        console.log(res);
      });
  }
}
