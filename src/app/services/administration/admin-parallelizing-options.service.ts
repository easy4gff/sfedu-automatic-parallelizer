import { Injectable } from '@angular/core';
import { AppHttpService } from '../app-http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParallelizingOptionModel } from '../../model/paralleizing-option/parallelizing-option.model';
import { FileInputMethodService } from '../file-input-method.service';

@Injectable()
export class AdminParallelizingOptionsService {

  public options$: BehaviorSubject<ParallelizingOptionModel[]> = new BehaviorSubject(null);

  constructor(
    private http: AppHttpService,
    private fileinputService: FileInputMethodService
  ) { }

  getAllParallelizingOptions() {
    this.http.getAllOptions().subscribe((options) => {
      this.options$.next(this.parseOptonResponse(options));
    });
  }

  public parseOptonResponse(serverResponseOptions: any) {
    return serverResponseOptions.map(option => {
      return {
        id: option.id,
        title: option.title,
        fileInputsMethods: option.fileInputsMethods.map(method => {
          return this.fileinputService.getOptionByType(method);
        }),
        libraryExamples: option.libraryExamples,
        status: option.status
      };
    });
  }
}
