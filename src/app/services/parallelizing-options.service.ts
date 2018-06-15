import { Injectable } from '@angular/core';
import { ParallelizingOptionModel } from '../model/paralleizing-option/parallelizing-option.model';
import { FileInputMethodType } from '../model/paralleizing-option/parallelizing-option.fileinput-method';
import { FileInputMethodService } from './file-input-method.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { RoutingConstants } from '../components/../model/routing-utils/routing-constants';
import { AppHttpService } from './app-http.service';
import { OptionRequestBuilderService } from './option-request-builder.service';

@Injectable()
export class ParallelizingOptionsService {
  public chosenOption: BehaviorSubject<ParallelizingOptionModel> = new BehaviorSubject(null);

  // private availableOptions: ParallelizingOptionModel[] = [];
  public availableOptions$: BehaviorSubject<ParallelizingOptionModel[]> = new BehaviorSubject([]);

  constructor(
    private fileinputService: FileInputMethodService,
    private sessionService: SessionService,
    private router: Router,
    private httpService: AppHttpService,
    private curOptionService: OptionRequestBuilderService
  ) {
    this.loadOptions();

    this.chosenOption.subscribe((opt) => {
      if (opt) {
        this.sessionService.storeChosenOption(opt);
        this.curOptionService.currentOptionType = opt.id;
      }
    });
  }

  public getAvailableOptions(): ParallelizingOptionModel[] {
    return this.availableOptions$.getValue();
  }

  public getChosenOption(performSearchInSessionStorage?: boolean): ParallelizingOptionModel {
    const chosenOpt: ParallelizingOptionModel = this.chosenOption.getValue();
    return chosenOpt || !performSearchInSessionStorage ? chosenOpt : this.sessionService.getChosenOption();
  }

  public parseOptonResponse(serverResponseOptions: any) {
    return serverResponseOptions.map(option => {
      return {
        id: option.id,
        title: option.title,
        fileInputsMethods: option.fileInputsMethods.map(method => {
          return this.fileinputService.getOptionByType(method);
        }),
        libraryExamples: option.libraryExamples
      };
    });
  }

  public loadOptions(): void {
    this.httpService.getOptions().subscribe((options) => {
      console.log(options);
      this.availableOptions$.next(
        this.parseOptonResponse(options));
    });
  }
}
