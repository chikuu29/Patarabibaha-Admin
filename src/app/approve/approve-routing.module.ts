import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserapproveComponent } from './userapprove/userapprove.component';
import { ProfileimagepproveComponent } from './profileimagepprove/profileimagepprove.component';
import { DeleterequestComponent } from './deleterequest/deleterequest.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userapprove-page',
        canActivate: [AuthGuard],
        component: UserapproveComponent
      }, {
        path: 'profileimagepprove-page',
        canActivate: [AuthGuard],
        component: ProfileimagepproveComponent
      },
      {
        path: 'deleterequest-page',
        canActivate: [AuthGuard],
        component: DeleterequestComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
