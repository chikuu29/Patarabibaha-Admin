import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    ErrorPageComponent,
    DashBoardComponent,
    LandingPageComponent,
    SocialmediaComponent,
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
