import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { UserapproveComponent } from './userapprove/userapprove.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material.module';
import { ProfileimagepproveComponent } from './profileimagepprove/profileimagepprove.component';


@NgModule({
  declarations: [
    UserapproveComponent,
    ProfileimagepproveComponent
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialModule
  ]
})
export class ApproveModule { }
