import { Injectable } from '@angular/core';
import { ParallelizingOptionData } from '../model/paralleizing-option/parallelizing-option-data';

@Injectable()
export class OptionRequestBuilderService {
  public currentOptionId: number;
  public optionData: ParallelizingOptionData;

  constructor() { }

  sendRequest() {
    console.log({
      optionId: this.currentOptionId,
      payload: this.optionData
    });
  }

}
