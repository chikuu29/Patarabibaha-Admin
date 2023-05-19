import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

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
        }
        
        
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
