import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ChatUserViewComponent } from './chat/chat-user-view/chat-user-view.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';

const routes: Routes = [

  {
    path: '',
    // canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'chat',
        canActivate: [AuthGuard],
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      }
     
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]

  },
  

 

  {
    path: 'approve',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./approve/approve.module').then(m => m.ApproveModule)
      }
    ]

  },
  {
    path: 'chating',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./chatting/chatting.module').then(m => m.ChattingModule)
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
    redirectTo: "/landing-page",
    pathMatch: 'full'

  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
