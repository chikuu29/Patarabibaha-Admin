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
    CustomPipeModule,
    NgbModule
  ],
  entryComponents:[ImageViewOperationComponent]
})
export class ComponentModule { }
