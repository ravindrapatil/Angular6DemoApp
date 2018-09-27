import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard } from '../../shared/guard/auth-guard.guard';
import { ClientPaginationComponent } from './client-pagination/client-pagination.component';
import { ChartComponent } from './chart/chart.component';
import { ServersidepaginationComponent } from './server-pagination/serversidepagination.component';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { CommunicationComponent } from './communication/communication.component';
import { CustomDirectiveComponent } from './custom-directive/custom-directive.component';
import { PileComponentComponent } from './pile-component/pile-component.component';
import { SearchComponent } from './search/search.component';
import { AjaxComponent } from './ajax/ajax.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouteParameterComponent } from './route-parameter/route-parameter.component';
import { PlayerdetailsComponent } from './playerdetails/playerdetails.component';
import { AddusersComponent } from './ngxs/addusers/addusers.component';
import { UserslistComponent } from './ngxs/userslist/userslist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Components'
    },
    children: [
      {
        path: 'pagination',
        component: ServersidepaginationComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Server side Pagination'
        }
      },
      {
        path: 'clientpagination',
        component: ClientPaginationComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Client side Pagination'
        }
      },
      {
        path: 'chart',
        component: ChartComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Chart JS'
        }
      },
      {
        path: 'highcharts',
        component: HighchartsComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Highcharts JS'
        }
      },
      {
        path: 'parent-child-communication',
        component: CommunicationComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Parent Child Communication'
        }
      },
      {
        path: 'directives',
        component: CustomDirectiveComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Custom Directive'
        }
      },
      {
        path: 'pipes',
        component: PileComponentComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Custom Pipes'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Search'
        }
      },
      {
        path: 'ajax',
        component: AjaxComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Ajax/HTTP calls'
        }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'RxJS Operations'
        }
      },
      {
        path: 'routerparameter',
        component: RouteParameterComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Route Parameters'
        }
      },
      {
        path: 'playerdetails',
        component: PlayerdetailsComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'Player Details'
        }
      },
      {
        path: 'ngxs',
        component: AddusersComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'NGXS'
        }
      },
      {
        path: 'chartdetails',
        component: UserslistComponent,
        canActivate: [AuthGuardGuard],
        data: {
          title: 'NGXS'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
