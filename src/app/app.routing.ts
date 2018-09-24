import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'base',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/base/base.module#BaseModule'
      // },
      // {
      //   path: 'buttons',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/buttons/buttons.module#ButtonsModule'
      // },
      // {
      //   path: 'charts',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      // },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuardGuard]
      },
      // {
      //   path: 'icons',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/icons/icons.module#IconsModule'
      // },
      // {
      //   path: 'notifications',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/notifications/notifications.module#NotificationsModule'
      // },
      // {
      //   path: 'theme',
      //   // canActivate: [AuthGuardGuard],
      //   loadChildren: './views/theme/theme.module#ThemeModule'
      // },
      {
        path: 'widgets',
        // canActivate: [AuthGuardGuard],
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'profile',
        canActivate: [AuthGuardGuard],
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'components',
        canActivate: [AuthGuardGuard],
        loadChildren: './views/components/components.module#ComponentsModule'
      }
      
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
