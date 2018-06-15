import { Injectable } from '@angular/core';
import { ParallelizingOptionsService } from './parallelizing-options.service';
import { AdminParallelizingOptionsService } from './administration/admin-parallelizing-options.service';

@Injectable()
export class AppService {

  constructor(
    private userOptionsService: ParallelizingOptionsService,
    private adminOptionsService: AdminParallelizingOptionsService
  ) { }

  reloadOptions() {
    this.userOptionsService.loadOptions();
    this.adminOptionsService.getAllParallelizingOptions();
  }
}
