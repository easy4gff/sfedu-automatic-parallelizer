import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SliderMenuServiceEventType } from '../model/slider-menu/slider-menu-service-event-type';

@Injectable()
export class SliderMenuService {
  events$: BehaviorSubject<SliderMenuServiceEventType> = new BehaviorSubject(null);

  constructor() { }

  show(): void {
    this.events$.next(SliderMenuServiceEventType.SHOW);
  }

  hide(): void {
    this.events$.next(SliderMenuServiceEventType.HIDE);
  }

}
