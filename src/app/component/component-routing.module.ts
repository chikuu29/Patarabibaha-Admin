import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AlluserdataComponent } from './alluserdata/alluserdata.component';
import { MakepaidComponent } from './makepaid/makepaid.component';
import { UpgradeuserplanComponent } from './upgradeuserplan/upgradeuserplan.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { ViewSpotlightComponent } from './view-spotlight/view-spotlight.component';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './banner/banner.component';
import { CouponComponent } from './coupon/coupon.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
        // component: DashboardComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'user/:profile_id',
        canActivate: [AuthGuard],
        component: UserViewComponent
      },
      {
        path: 'alluserdata',
        canActivate: [AuthGuard],
        component: AlluserdataComponent
      },
      {
        path: 'addtopaid',
        canActivate: [AuthGuard],
        component: MakepaidComponent
      },
      {
        path: 'upgrade',
        canActivate: [AuthGuard],
        component: UpgradeuserplanComponent
      },
      {
        path: 'spotlight',
        canActivate: [AuthGuard],
        component: SpotlightComponent
      },
      {
        path: 'view-spotlight',
        canActivate: [AuthGuard],
        component: ViewSpotlightComponent
      },
      {
        path: 'logo-page',
        canActivate: [AuthGuard],
        component: LogoComponent
      },
      {
        path: 'banner-page',
        canActivate: [AuthGuard],
        component: BannerComponent
      },
      {
        path: 'deatils-page',
        canActivate: [AuthGuard],
        component: CouponComponent
      },
      
      
      
      
      
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
