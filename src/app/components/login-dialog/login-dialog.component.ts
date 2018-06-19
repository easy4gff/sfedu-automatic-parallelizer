import { Component, OnInit } from '@angular/core';
import { LoginDialogService } from '../../services/login-dialog.service';
import { LoginDialogServiceEventType } from '../../model/login-dialog/login-dialog-event-type';
import { LoginService } from '../../services/login.service';
import { LanguageService } from '../../services/language.service';
import { LanguageConstants } from '../../model/language/language-constants';

@Component({
  selector: 'app-login-dialog',
  template: `
    <p-dialog
      id="login-dialog"
      [(visible)]="visible"
      [header]="labelLogin"
      [width]="600"
      [modal]="true"
    >
      <div class="centered">
          <table>
            <tr>
              <td>
                <label>
                  <span class="label-text">{{ labelUsername }}:</span>
                </label>
              </td>

              <td>
                <input
                  pInputText
                  type="text"
                  id="username"
                  [(ngModel)]="username"
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>
                  <span class="label-text">{{ labelPassword }}:</span>
                </label>
              </td>

              <td>
                <input
                  pInputText
                  type="password"
                  [(ngModel)]="password"
                />
              </td>
            </tr>
          </table>

      </div>

      <div class="centered" *ngIf="errorInvalidLoginPasswordVisible">
        <p-message severity="error" [text]="labelErorInvalidLoginPassword"></p-message>
      </div>

      <div class="centered">
        <button
          pButton
          [label]="'OK'"
          [disabled]="username === '' || password == ''"
          (click)="logIn()"
        >
        </button>
      </div>

    </p-dialog>
  `,
  styles: [`
    .centered {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px;
    }

    label {
      margin-right: 10px;
    }

    /*.label-text {
      display: inline-block;
      width: 50px;
    }*/
  `]
})
export class LoginDialogComponent implements OnInit {
  labelUsername: string;
  labelPassword: string;
  labelLogin: string;
  labelErorInvalidLoginPassword: string;

  visible = false;
  username: string;
  password: string;

  errorInvalidLoginPasswordVisible = false;

  constructor(
    private loginDialogService: LoginDialogService,
    private loginService: LoginService,
    private languageService: LanguageService
  ) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {

    this.languageService.currentLanguage$.subscribe(lang => {
      this.labelUsername = this.languageService.get(LanguageConstants.USERNAME);
      this.labelPassword = this.languageService.get(LanguageConstants.PASSWORD);
      this.labelLogin = this.languageService.get(LanguageConstants.LOG_IN);
      this.labelErorInvalidLoginPassword = this.languageService.get(LanguageConstants.ERROR_INVALID_LOGIN_PASSWORD);
    });

    this.loginDialogService.events$.subscribe(event => {
      switch (event) {
        case LoginDialogServiceEventType.SHOW_DIALOG:
          this.visible = true;
          this.errorInvalidLoginPasswordVisible = false;
          break;

        case LoginDialogServiceEventType.HIDE_DIALOG:
          this.visible = false;
          this.username = '';
          this.password = '';
          this.errorInvalidLoginPasswordVisible = false;
          break;

        case LoginDialogServiceEventType.INVALID_LOGIN_PASSWORD:
          this.errorInvalidLoginPasswordVisible = true;
          this.username = '';
          this.password = '';
          break;

        default:
          break;
      }
    });
  }

  logIn(): void {
    this.loginService.logIn(this.username, this.password);
  }

}
