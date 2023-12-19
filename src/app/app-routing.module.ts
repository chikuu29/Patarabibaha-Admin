import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ApproveModule } from './approve/approve.module';
import { ChattingModule } from './chatting/chatting.module';

const routes: Routes = [
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)

  },
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
    path: 'chating',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./chatting/chatting.module').then(m=>m.ChattingModule)
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
