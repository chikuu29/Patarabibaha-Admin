import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattingRoutingModule } from './chatting-routing.module';
import { MassageComponent } from './massage/massage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    MassageComponent
  ],
  imports: [
    CommonModule,
    ChattingRoutingModule,
    ChattingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialModule
  ]
})
export class ChattingModule { }
