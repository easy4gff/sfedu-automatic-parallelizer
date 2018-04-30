import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paralleling-menu',
  template: `
    <div>
        <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    /*#main {
      float: none;
    }

    #main::after {
      clear: both;
      content: "";
      display: table;
    }*/
  `]
})
export class ParallelingMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
