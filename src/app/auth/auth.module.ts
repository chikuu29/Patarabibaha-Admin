import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AppService } from '../services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewAuthUserComponent } from './view-auth-user/view-auth-user.component';
import { MaterialModule } from '../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { ChangeuserpassComponent } from './changeuserpass/changeuserpass.component';
import { TwostepverificationComponent } from './twostepverification/twostepverification.component';


@NgModule({
  declarations: [
    LoginComponent,
    ViewAuthUserComponent,
    ChangeuserpassComponent,
    TwostepverificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PrimengModule,
    CustomPipeModule

  ],
  providers:[AppService]
})
export class AuthModule { }
