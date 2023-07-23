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



@NgModule({
  declarations: [
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    ImageViewOperationComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    LoadingBarRouterModule,
    ReactiveFormsModule,
    CustomPipeModule
  ],
  exports:[
    NavBarComponent,
    SideNavComponent,
    FooterComponent,
    ImageViewOperationComponent
  ]
})
export class SharedModule { }
