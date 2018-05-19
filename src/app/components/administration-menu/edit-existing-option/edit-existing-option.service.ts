import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParallelizingOptionModel } from '../../../model/paralleizing-option/parallelizing-option.model';

@Injectable()
export class EditExistingOptionService {
  chosenOption$: BehaviorSubject<ParallelizingOptionModel> = new BehaviorSubject(null);

  constructor() {}

}
