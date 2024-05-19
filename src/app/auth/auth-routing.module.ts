import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';
import { ViewAuthUserComponent } from './view-auth-user/view-auth-user.component';
import { ChangeuserpassComponent } from './changeuserpass/changeuserpass.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';
import { SubadmincreateComponent } from './subadmincreate/subadmincreate.component';
import { SubadminviewComponent } from './subadminview/subadminview.component';

const routes: Routes = [
  {
    path: '',
    // component: LoginComponent,
    children: [

      {
        path: '',
        redirectTo: '/landing-page',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: LoginComponent
        // pathMatch: 'full'
      },
      {
        path: 'view-auth-user',
        component: ViewAuthUserComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'pass',
        canActivate: [AuthGuard],
        component: ChangeuserpassComponent,
        pathMatch: 'full'
      },
      {
        path: '2wayverification/:id',
        canActivate: [AuthGuard],
        component: TwostepverificationComponent,
        pathMatch: 'full'
      },
      {
        path: 'subadminview',
        canActivate: [AuthGuard],
        component: SubadminviewComponent,
        pathMatch: 'full'
      },
      {
        path: 'subadmincreate',
        canActivate: [AuthGuard],
        component: SubadmincreateComponent,
        pathMatch: 'full'
      },
      {
        path: 'subadmincreate/:id',
        canActivate: [AuthGuard],
        component: SubadmincreateComponent,
        pathMatch: 'full'
      },

      {
        path: 'error-page',
        // canActivate: [AuthGuard],
        component: ErrorPageComponent,
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
