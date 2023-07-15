import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { ContryComponent } from './contry/contry.component';
import { StateComponent } from './state/state.component';
import { ZodiacsComponent } from './zodiacs/zodiacs.component';
import { NakshatraComponent } from './nakshatra/nakshatra.component';
import { AnnualincomeComponent } from './annualincome/annualincome.component';
import { ViweplanComponent } from './viweplan/viweplan.component';
import { AddplanComponent } from './addplan/addplan.component';
import { CityComponent } from './city/city.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermandConditionComponent } from './termand-condition/termand-condition.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MothertongueComponent } from './mothertongue/mothertongue.component';
import { HighestEducationComponent } from './highest-education/highest-education.component';
import { AddionalEducationComponent } from './addional-education/addional-education.component';
import { OccupationComponent } from './occupation/occupation.component';
import { EmployredinComponent } from './employredin/employredin.component';
import { CasteComponent } from './caste/caste.component';
import { SubcasteComponent } from './subcaste/subcaste.component';
import { ReligionComponent } from './religion/religion.component';


const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full'
        // component: DashboardComponent
      },
      {
        path: 'landing-page',
        canActivate: [AuthGuard],
        component: LandingPageComponent
      },
      {
        path: 'socialmedia-page',
        canActivate: [AuthGuard],
        component: SocialmediaComponent
      },
      {
        path: 'country-page',
        canActivate: [AuthGuard],
        component: ContryComponent
      },
      {
        path: 'state-page',
        canActivate: [AuthGuard],
        component: StateComponent
      },
      {
        path: 'zodiacs-page',
        canActivate: [AuthGuard],
        component: ZodiacsComponent
      },
      {
        path: 'nakshatra-page',
        canActivate: [AuthGuard],
        component: NakshatraComponent
      },
      {
        path: 'annualincome-page',
        canActivate: [AuthGuard],
        component: AnnualincomeComponent
      },
      {
        path: 'addplan-page',
        canActivate: [AuthGuard],
        component: AddplanComponent
      },
      {
        path: 'viweplan-page',
        canActivate: [AuthGuard],
        component: ViweplanComponent
      }, {
        path: 'city-page',
        canActivate: [AuthGuard],
        component: CityComponent
      },
      {
        path: 'privacypolicy-page',
        canActivate: [AuthGuard],
        component: PrivacypolicyComponent
      }, {
        path: 'contactus-page',
        canActivate: [AuthGuard],
        component: ContactusComponent
      }, {
        path: 'termandcondition-page',
        canActivate: [AuthGuard],
        component: TermandConditionComponent
      }, {
        path: 'aboutus-page',
        canActivate: [AuthGuard],
        component: AboutusComponent
      }, {
        path: 'mother-tongue-page',
        canActivate: [AuthGuard],
        component: MothertongueComponent
      }, {
        path: 'education-page',
        canActivate: [AuthGuard],
        component: HighestEducationComponent
      }, {
        path: 'aditional-education-page',
        canActivate: [AuthGuard],
        component: AddionalEducationComponent
      }, {
        path: 'occupation-page',
        canActivate: [AuthGuard],
        component: OccupationComponent
      }, {
        path: 'employedin-page',
        canActivate: [AuthGuard],
        component: EmployredinComponent
      },{
        path: 'cast-page',
        canActivate: [AuthGuard],
        component: CasteComponent
      },{
        path: 'subcast-page',
        canActivate: [AuthGuard],
        component: SubcasteComponent
      },{
        path: 'religion-page',
        canActivate: [AuthGuard],
        component: ReligionComponent
      },

      






















    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
