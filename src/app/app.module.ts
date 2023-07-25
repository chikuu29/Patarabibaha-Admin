import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MaterialModule } from './material/material.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUiCustomTemplateComponent } from './block-ui-custom-template.component';
import { ToastrModule } from 'ngx-toastr';
import { ComponentModule } from './component/component.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './primeng/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ApproveModule } from './approve/approve.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    NgbModule,
    SharedModule,
    PagesModule,
    ComponentModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    NgxUiLoaderModule,
    FormsModule,
    ApproveModule,
    BlockUIModule.forRoot(
      {
        template: BlockUiCustomTemplateComponent
      }
    ),
    ToastrModule.forRoot(),
    
  ],
  providers: [AppService,MessageService,ConfirmationService,NgbActiveModal],
  entryComponents: [BlockUiCustomTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
