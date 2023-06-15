import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { FooterComponent } from './shared/footer/footer.component';
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
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    PagesModule,
    ComponentModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    NgxUiLoaderModule,
    FormsModule,
    
    BlockUIModule.forRoot(
      {
        template: BlockUiCustomTemplateComponent
      }
    ),
    ToastrModule.forRoot()
  ],
  providers: [AppService],
  entryComponents: [BlockUiCustomTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
