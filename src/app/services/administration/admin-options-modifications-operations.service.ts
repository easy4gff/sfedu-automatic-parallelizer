import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OptionRepresentationMode } from '../../components/administration-menu/option-representation/option-representation-mode';

@Injectable()
export class AdminOptionsModificationsOperationsService {

  currentOperation$: BehaviorSubject<OptionRepresentationMode> = new BehaviorSubject(null);

  constructor() { }

}
