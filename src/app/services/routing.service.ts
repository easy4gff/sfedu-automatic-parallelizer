import { Injectable } from '@angular/core';
import { ParallelizingOptionModel } from '../model/paralleizing-option/parallelizing-option.model';
import { Router } from '@angular/router';
import { ParallelizingOptionsService } from './parallelizing-options.service';
import { RoutingConstants } from '../model/routing-utils/routing-constants';
import { LoginService } from './login.service';

@Injectable()
export class RoutingService {

  constructor(
    private router: Router,
    private optionsService: ParallelizingOptionsService,
    private loginService: LoginService
  ) { }

  public redirectHomeIfNoOptionSelected(): void {
    const chosenOpt: ParallelizingOptionModel = this.optionsService.getChosenOption(true);
    if (!chosenOpt) {
      this.redirectHome();
    }
  }

  public redirectHomeIfNotLoggedIn(): void {
    if (this.loginService.user$.getValue() === null) {
      this.redirectHome();
    }
  }

  public redirectHome(): void {
    this.router.navigateByUrl('');
  }
}
