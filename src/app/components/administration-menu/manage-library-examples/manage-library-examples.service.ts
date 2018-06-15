import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParallelizingOptionModel } from '../../../model/paralleizing-option/parallelizing-option.model';
import { LibraryExample } from '../../../model/library-code-example/library-example.model';
import { ExampleManagementActionType } from './action-list/action-list-items';

@Injectable()
export class ManageLibraryExamplesService {

  public chosenOption$: BehaviorSubject<ParallelizingOptionModel> = new BehaviorSubject(null);
  public chosenExample$: BehaviorSubject<LibraryExample> = new BehaviorSubject(null);
  public currentAction$: BehaviorSubject<ExampleManagementActionType> = new BehaviorSubject(null);

  constructor() { }

}
