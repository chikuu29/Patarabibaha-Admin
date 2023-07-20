import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ApproveModule } from './approve/approve.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./component/component.module').then(m=>m.ComponentModule)
      }
    ]
  },

  {
    path: 'approve',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./approve/approve.module').then(m=>m.ApproveModule)
      }
    ]
  },



  {
    path: 'error-page',
    canActivate: [AuthGuard],
    component: PageNotFoundComponent
  },
  {

    path: "**",
    redirectTo: "auth/error-page",
    pathMatch: 'full'

  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
