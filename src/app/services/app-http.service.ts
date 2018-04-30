import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const SERVER_API = '/api';
const PARALLELIZING_OPTIONS = '/parallelizing-options';

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) { }

  public getOptions(): Observable<any> {
    return this.http.get(SERVER_API + PARALLELIZING_OPTIONS);
  }

}
