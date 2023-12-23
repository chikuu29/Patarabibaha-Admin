import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUserViewComponent } from './chat-user-view/chat-user-view.component';
import { ChatHomePageComponent } from './chat-home-page/chat-home-page.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'chat',
      //   pathMatch: 'full'
      //   // component: DashboardComponent
      // },
      {
        path: 'chat',
        // pathMatch:'full',
        component: ChatUserViewComponent
      },
      {
        path: 'chat/:profile_id',
        // pathMatch:'full',
        component: ChatHomePageComponent
      },
      {
        path: ':profile_id/chat_room/:chat_rome_id',
        // pathMatch:'full',
        component: ChatRoomComponent,
        // canActivate: [AuthGuard]
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
