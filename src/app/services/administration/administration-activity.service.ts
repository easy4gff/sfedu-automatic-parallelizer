import { Injectable } from '@angular/core';

import { AdministrationAction } from '../../model/administration-activity/administration-actions';
import { AdminParallelizingOptionsService } from './admin-parallelizing-options.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParallelizingOptionModel } from '../../model/paralleizing-option/parallelizing-option.model';
import { LibraryExample } from '../../model/library-code-example/library-example.model';
import { AdminCodeExamplesService } from './admin-code-examples.service';

@Injectable()
export class AdministrationActivityService {
  // public parallelizingOptions: BehaviorSubject<ParallelizingOptionModel[]> = new BehaviorSubject([]);
  // public sourceCodeExamples: BehaviorSubject<LibraryExample[]> = new BehaviorSubject([]);
  public adminActions: AdministrationAction[] = AdministrationAction.getActionsList();

  constructor(
    private adminOptionsService: AdminParallelizingOptionsService,
    private adminCodeExamplesService: AdminCodeExamplesService
  ) { }

  public pullAdminDataFromServer(): void {
    this.adminOptionsService.getAllParallelizingOptions();
    this.adminCodeExamplesService.getExamples();
  }

}
