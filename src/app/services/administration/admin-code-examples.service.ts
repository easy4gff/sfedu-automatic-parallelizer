import { Injectable } from '@angular/core';
import { AppHttpService } from '../app-http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LibraryExample } from '../../model/library-code-example/library-example.model';

@Injectable()
export class AdminCodeExamplesService {
  public examples$: BehaviorSubject<LibraryExample[]> = new BehaviorSubject([]);

  constructor(private http: AppHttpService) { }

  getExamples(): void {
    this.http.getSourceCodeExamples()
      .subscribe(results => {
          this.examples$.next(results);
        }
      );
  }

}
