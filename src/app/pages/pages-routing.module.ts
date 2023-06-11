import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { ContryComponent } from './contry/contry.component';
import { StateComponent } from './state/state.component';
import { ZodiacsComponent } from './zodiacs/zodiacs.component';

const routes: Routes = [
  
    {
      path: '',
      children: [
        {
          path: '', 
          redirectTo:'landing-page',
          pathMatch:'full'
          // component: DashboardComponent
        },
        {
          path: 'landing-page', 
          canActivate:[AuthGuard],
          component: LandingPageComponent
        },
        {
          path: 'socialmedia-page', 
          canActivate:[AuthGuard],
          component: SocialmediaComponent
        },
        {
          path: 'country-page', 
          canActivate:[AuthGuard],
          component: ContryComponent
        },
        {
          path: 'state-page', 
          canActivate:[AuthGuard],
          component: StateComponent
        },
        {
          path: 'zodiacs-page', 
          canActivate:[AuthGuard],
          component: ZodiacsComponent
        },
        
        
        
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
