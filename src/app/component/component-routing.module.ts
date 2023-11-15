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
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { MatchpageComponent } from './matchpage/matchpage.component';
import { LoginactivityComponent } from './loginactivity/loginactivity.component';
import { LoginactivityallComponent } from './loginactivityall/loginactivityall.component';
import { LikeprofiledetailsComponent } from './likeprofiledetails/likeprofiledetails.component';
import { LikeprofileviewComponent } from './likeprofileview/likeprofileview.component';
import { IgnoreactivityComponent } from './ignoreactivity/ignoreactivity.component';
import { IgnoredeatilsComponent } from './ignoredeatils/ignoredeatils.component';
import { ExpirememberComponent } from './expiremember/expiremember.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { WatermarkComponent } from './watermark/watermark.component';
import { CreateUserComponent } from './create-user/create-user.component';

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
      }, {
        path: 'match-makng-page',
        canActivate: [AuthGuard],
        component: MatchmakingComponent
      },
      {
        path: 'matches-page/:id',
        canActivate: [AuthGuard],
        component: MatchpageComponent
      },
      {
        path: 'login-activity',
        canActivate: [AuthGuard],
        component: LoginactivityComponent
      },
      {
        path: 'login-activity/details/:id',
        canActivate: [AuthGuard],
        component: LoginactivityallComponent
      },
      {
        path: 'like-activity',
        canActivate: [AuthGuard],
        component: LikeprofileviewComponent
      },
      {
        path: 'like-activity/details/:id',
        canActivate: [AuthGuard],
        component: LikeprofiledetailsComponent
      },
      {
        path: 'ignore-activity',
        canActivate: [AuthGuard],
        component: IgnoreactivityComponent
      },
      {
        path: 'ignore-activity-details/:id',
        canActivate: [AuthGuard],
        component: IgnoredeatilsComponent
      },
      {
        path: 'expire-member',
        canActivate: [AuthGuard],
        component:  ExpirememberComponent
      },
      {
        path: 'sales-report',
        canActivate: [AuthGuard],
        component:  SalesreportComponent
      },{
        path: 'water-page',
        canActivate: [AuthGuard],
        component: WatermarkComponent
      },
      {
        path: 'create_user',
        canActivate: [AuthGuard],
        component: CreateUserComponent
      },


     

      
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
