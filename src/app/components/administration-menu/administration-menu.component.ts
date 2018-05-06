import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-administration-menu',
  template: `
    <p>
      administration-menu works!
    </p>
  `,
  styles: []
})
export class AdministrationMenuComponent implements OnInit {

  constructor(
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    console.log('Administration menu init');
    this.routingService.redirectHomeIfNotLoggedIn();
  }

}
