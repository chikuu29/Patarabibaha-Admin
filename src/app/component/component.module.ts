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
    CouponComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    MaterialModule,
    CustomPipeModule,
    NgbModule
  ],
  entryComponents:[ImageViewOperationComponent]
})
export class ComponentModule { }
