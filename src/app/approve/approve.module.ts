import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { UserapproveComponent } from './userapprove/userapprove.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material.module';
import { DeleterequestComponent } from './deleterequest/deleterequest.component';
import { ProfileimagepproveComponent } from './profileimagepprove/profileimagepprove.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { SuccessstotyapprovelComponent } from './successstotyapprovel/successstotyapprovel.component';
import { IdproofapprovalComponent } from './idproofapproval/idproofapproval.component';
import { HoroscopeapprovalComponent } from './horoscopeapproval/horoscopeapproval.component';
import { SalapprovalComponent } from './salapproval/salapproval.component';
import { MobilenochangeComponent } from './mobilenochange/mobilenochange.component';
import { EmailidchangeComponent } from './emailidchange/emailidchange.component';
import { GenderchangeComponent } from './genderchange/genderchange.component';
import { WhatsappnochangeComponent } from './whatsappnochange/whatsappnochange.component';



@NgModule({
  declarations: [
    UserapproveComponent,
    ProfileimagepproveComponent,
    DeleterequestComponent,
    SuccessstotyapprovelComponent,
    IdproofapprovalComponent,
    HoroscopeapprovalComponent,
    SalapprovalComponent,
    MobilenochangeComponent,
    EmailidchangeComponent,
    GenderchangeComponent,
    WhatsappnochangeComponent,
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    NgbPaginationModule,
    NgbModule,
    CustomPipeModule
  ]
})
export class ApproveModule { }
