import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserapproveComponent } from './userapprove/userapprove.component';
import { ProfileimagepproveComponent } from './profileimagepprove/profileimagepprove.component';
import { DeleterequestComponent } from './deleterequest/deleterequest.component';
import { SuccessstotyapprovelComponent } from './successstotyapprovel/successstotyapprovel.component';
import { HoroscopeapprovalComponent } from './horoscopeapproval/horoscopeapproval.component';
import { SalapprovalComponent } from './salapproval/salapproval.component';
import { IdproofapprovalComponent } from './idproofapproval/idproofapproval.component';

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
      {
        path: 'successstotyapprovel-page',
        canActivate: [AuthGuard],
        component: SuccessstotyapprovelComponent
      },
      {
        path: 'Horoscopeapprovel-page',
        canActivate: [AuthGuard],
        component: HoroscopeapprovalComponent
      },
      {
        path: 'salapprovel-page',
        canActivate: [AuthGuard],
        component: SalapprovalComponent
      },
      {
        path: 'idapprovel-page',
        canActivate: [AuthGuard],
        component: IdproofapprovalComponent
      },












    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
