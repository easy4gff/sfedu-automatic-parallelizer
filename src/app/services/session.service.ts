import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ParallelizingOptionModel } from '../model/paralleizing-option/parallelizing-option.model';

@Injectable()
export class SessionService {
  public static readonly KEY_CHOSEN_OPT = 'CHOSEN_OPT';

  constructor(private sessionStorageService: SessionStorageService) {}

  getChosenOption(): ParallelizingOptionModel {
    console.log('Retrieve: ', this.sessionStorageService.retrieve(SessionService.KEY_CHOSEN_OPT));
    return this.sessionStorageService.retrieve(SessionService.KEY_CHOSEN_OPT);
  }

  storeChosenOption(chosenOpt: ParallelizingOptionModel): void {
    console.log('Store: ', chosenOpt);
    this.sessionStorageService.store(SessionService.KEY_CHOSEN_OPT, chosenOpt);
  }

}
