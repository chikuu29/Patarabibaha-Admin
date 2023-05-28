import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from '../pages/error-page/error-page.component';

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
    path: 'error-page',
    canActivate: [AuthGuard],
    component:ErrorPageComponent ,
    pathMatch: 'full'
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
