import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattingRoutingModule } from './chatting-routing.module';
import { MassageComponent } from './massage/massage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';


@NgModule({
  declarations: [
    MassageComponent,

  ],
  imports: [
    CommonModule,
    ChattingRoutingModule,
    ChattingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialModule,
    SharedModule,
    CustomPipeModule,
    NgbPaginationModule
  ]
})
export class ChattingModule { }
