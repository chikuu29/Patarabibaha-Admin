import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    MaterialModule,
    CustomPipeModule
  ]
})
export class ComponentModule { }
