import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClientServerMessageLogoutMessage } from '../model/client-server-communication/client-server-messages.model';

const SERVER_API = '/api';
const PARALLELIZING_OPTIONS = '/parallelizing-options';
const LOGIN = '/login';
const LOGOUT = '/logout';
const PARALLELIZE_INPUT = '/parallelize';

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) { }

  public getOptions(): Observable<any> {
    return this.http.get(SERVER_API + PARALLELIZING_OPTIONS);
  }

  public logIn(username: string, password: string): Observable<any> {
    return this.http.post(SERVER_API + LOGIN, {
      username: username,
      password: password
    });
  }

  public logOut(): Observable<any> {
    return this.http.get(SERVER_API + LOGOUT);
  }

  public parallelize(): Observable<any> {
    return this.http.get(SERVER_API + PARALLELIZE_INPUT);
  }

}
