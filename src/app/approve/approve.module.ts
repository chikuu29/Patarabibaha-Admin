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



@NgModule({
  declarations: [
    UserapproveComponent,
    ProfileimagepproveComponent,
    DeleterequestComponent,
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
