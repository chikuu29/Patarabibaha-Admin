import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';
import { ViewAuthUserComponent } from './view-auth-user/view-auth-user.component';
import { ChangeuserpassComponent } from './changeuserpass/changeuserpass.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'view-auth-user',
    component: ViewAuthUserComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'userpasswordchange',
    canActivate: [AuthGuard],
    component:ChangeuserpassComponent ,
    pathMatch: 'full'
  },
  {
    path: '2wayverification/:id',
    canActivate: [AuthGuard],
    component:TwostepverificationComponent ,
    pathMatch: 'full'
  },
  
  {
    path: 'error-page',
    canActivate: [AuthGuard],
    component:ErrorPageComponent ,
    pathMatch: 'full'
  },
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
