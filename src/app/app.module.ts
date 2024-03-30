import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './services/app.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { NgbActiveModal, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { ApproveModule } from './approve/approve.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChatModule } from './chat/chat.module';
import { AuthorizationInterceptor } from './utils/authorization.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminComponent } from './layout/admin/admin.component';
export function checkLoginMode(auth: AuthService) {
  console.log("REBUILDING AUTH STATE....");
  return () => {
    // Initialization code, e.g., fetching configuration data
    return auth.autoSignIn();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    NgbModule,
    NgbPaginationModule,
    SharedModule,
    ChatModule,
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
    ImageCropperModule

  ],
  providers: [
    AppService,
    MessageService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: checkLoginMode,
      deps: [AuthService],
      multi: true, // Indicates that there can be multiple APP_INITIALIZER functions
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  entryComponents: [BlockUiCustomTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
