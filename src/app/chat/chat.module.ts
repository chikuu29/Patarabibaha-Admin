import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUserViewComponent } from './chat-user-view/chat-user-view.component';
import { ChatRoutingModule } from './chat-routing.module';
import { CustomPipeModule } from "../customPipe/custom-pipe.module";
import { SharedModule } from "../shared/shared.module";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material.module';
import { ChatHomePageComponent } from './chat-home-page/chat-home-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-room/chat-room.component';



@NgModule({
    declarations: [
        ChatUserViewComponent,
        ChatHomePageComponent,
        ChatRoomComponent
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        CustomPipeModule,
        SharedModule,
        NgbPaginationModule,
        PrimengModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ChatModule { }
