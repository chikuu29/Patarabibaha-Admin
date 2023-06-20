import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateComponent } from './state/state.component';
import { ContryComponent } from './contry/contry.component';
import { ZodiacsComponent } from './zodiacs/zodiacs.component';
import { NakshatraComponent } from './nakshatra/nakshatra.component';
import { AnnualincomeComponent } from './annualincome/annualincome.component';
import { ViweplanComponent } from './viweplan/viweplan.component';
import { AddplanComponent } from './addplan/addplan.component';
import { CityComponent } from './city/city.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermandConditionComponent } from './termand-condition/termand-condition.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    ErrorPageComponent,
    LandingPageComponent,
    SocialmediaComponent,
    StateComponent,
    ContryComponent,
    ZodiacsComponent,
    NakshatraComponent,
    AnnualincomeComponent,
    ViweplanComponent,
    AddplanComponent,
    CityComponent,
    PrivacypolicyComponent,
    TermandConditionComponent,
    AboutusComponent,
    ContactusComponent,
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
