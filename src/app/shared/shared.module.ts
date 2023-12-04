import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ImageViewOperationComponent } from './image-view-operation/image-view-operation.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { MaterialModule } from '../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { MemberPaymentProcessingTaskComponent } from './member-payment-processing-task/member-payment-processing-task.component';
import { ViewPageForMembershipplanComponent } from './view-page-for-membershipplan/view-page-for-membershipplan.component';
import { UpgradePaymentProcessTaskComponent } from './upgrade-payment-process-task/upgrade-payment-process-task.component';
import { SearchComponent } from './search/search.component';
import { ImageCroperComponent } from './image-croper/image-croper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FillterModalComponent } from './fillter-modal/fillter-modal.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    ImageViewOperationComponent,
    MemberPaymentProcessingTaskComponent,
    ViewPageForMembershipplanComponent,
    UpgradePaymentProcessTaskComponent,
    SearchComponent,
    ImageCroperComponent,
    FillterModalComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    CustomPipeModule,
    ImageCropperModule
  ],
  exports:[
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    ImageViewOperationComponent,
    MemberPaymentProcessingTaskComponent,
    SearchComponent,
    ImageCroperComponent
  ]
})
export class SharedModule { }
