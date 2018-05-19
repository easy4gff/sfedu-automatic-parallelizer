import { Routes } from '@angular/router';

import { parallizilingMenuRoutes } from './components/paralleling-menu/paralleling-menu.module';
import { MainComponent } from './components/main/main.component';
import { AdministrationMenuComponent } from './components/administration-menu/administration-menu.component';

import { RoutingConstants } from './model/routing-utils/routing-constants';
import { AdministrationMenuRoutes } from './components/administration-menu/administration-menu.routes';

export const routes: Routes = [
    { path: '', redirectTo: 'parallelizing-process', pathMatch: 'full' },
    { path: RoutingConstants.PARALLELIZING_PROCESS, component: MainComponent, children: parallizilingMenuRoutes },
    { path: RoutingConstants.DOCUMENTATION, component: MainComponent },
    { path: RoutingConstants.ADMINISTRATION_MENU, component: AdministrationMenuComponent, children: AdministrationMenuRoutes }
];
