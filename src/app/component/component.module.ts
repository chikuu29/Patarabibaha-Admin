import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageViewOperationComponent } from '../shared/image-view-operation/image-view-operation.component';
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
import { PartnerPreferenceComponent } from './partner-preference/partner-preference.component';
import { LoginactivityComponent } from './loginactivity/loginactivity.component';
import { LoginactivityallComponent } from './loginactivityall/loginactivityall.component';
import { LikeprofileviewComponent } from './likeprofileview/likeprofileview.component';
import { LikeprofiledetailsComponent } from './likeprofiledetails/likeprofiledetails.component';
import { IgnoreactivityComponent } from './ignoreactivity/ignoreactivity.component';
import { IgnoredeatilsComponent } from './ignoredeatils/ignoredeatils.component';
import { ExpirememberComponent } from './expiremember/expiremember.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { WatermarkComponent } from './watermark/watermark.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from '../shared/shared.module';
import { AgePipe } from '../customPipe/age.pipe';
import { GraphDataViewComponent } from './graph-data-view/graph-data-view.component';
import { DesignationComponent } from './designation/designation.component';
import { UserfilterComponent } from './userfilter/userfilter.component';
import { PhonevalidationComponent } from './phonevalidation/phonevalidation.component';
import { EmailvalidationComponent } from './emailvalidation/emailvalidation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserViewComponent,
    AlluserdataComponent,
    MakepaidComponent,
    UpgradeuserplanComponent,
    SpotlightComponent,
    ViewSpotlightComponent,
    LogoComponent,
    BannerComponent,
    CouponComponent,
    MatchmakingComponent,
    MatchpageComponent,
    PartnerPreferenceComponent,
    LoginactivityComponent,
    LoginactivityallComponent,
    LikeprofileviewComponent,
    LikeprofiledetailsComponent,
    IgnoreactivityComponent,
    IgnoredeatilsComponent,
    ExpirememberComponent,
    SalesreportComponent ,
    WatermarkComponent,
    CreateUserComponent,
    GraphDataViewComponent,
    DesignationComponent,
    UserfilterComponent,
    PhonevalidationComponent,
    EmailvalidationComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    MaterialModule,
    CustomPipeModule,
    NgbModule,
    SharedModule
  ],
  providers:[AgePipe],
  entryComponents:[ImageViewOperationComponent]
})
export class ComponentModule { }
