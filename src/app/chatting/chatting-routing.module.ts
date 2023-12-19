import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MassageComponent } from './massage/massage.component';
import { AuthGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: MassageComponent
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChattingRoutingModule { }
