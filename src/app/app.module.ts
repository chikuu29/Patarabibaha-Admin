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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    PagesModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    NgxUiLoaderModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
