import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-plan-deatils',
  templateUrl: './plan-deatils.component.html',
  styleUrls: ['./plan-deatils.component.scss']
})
export class PlanDeatilsComponent implements OnInit {

  panelOpenState = false;
  plan: any = {};
  planRemaingFeature: any
  Object: any = Object;
  keyMapping: any = {
    "membership_plan_default": "Membership Plan Amount",
    "membership_plan_id": "Membership ID",
    "membership_plan_type": "Membership Type",
    "membership_plan_amount": "Amount",
    "membership_plan_visibility":"Visibility",
    "membership_plan_validity_date": "Membership Vlidity Data",
    "membership_plan_no_of_photo": "Membership Photo ",
    "membership_plan_of_send_message": "Membership Send Message",
    "membership_plan_no_of_horscope": "Membership Horscope",
    "membership_plan_no_of_contact": "Membership Contact",
    "membership_plan_created_date_time": "Membership Start Date",
    "membership_plan_updated_date_time": "Membership Update Date",
    "membership_plan_status": "Membership Status",
    "membership_plan_dicount": "Membership Discount",
    "membership_plan_show_contact_number_other": "Membership Contact View",
    "membership_plan_name": "Membership Name",
    "membership_plan_currency":"Membership Currency",
    "membership_plan_chating": "Membership Chating",
  };
  editedplandetails: any;
  constructor(
   // private planservice: PlanService,
    private ApiParameterScript: ApiParameterScript,
    private appService:AppService,
    private activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res:any)=>{
        if(res.id != ''){
          this.getAllplan(res.id);
          this.editedPlan(res.id);
        }
    })

  }
  getAllplan(data:any) {
    //this.plan = this.planservice.getPlanInfo;
    let param1 = {
      "projection": ['*'],
      "whereConditions": { "user_id": data }
    }
    this.ApiParameterScript.fetchdata('user_plan_deatils', param1).subscribe((getprofile_res: any) => {

      if (getprofile_res.success && getprofile_res['data'].length > 0) {
        this.plan = getprofile_res['data'];
        console.log(this.plan);
      }else{
        this.plan = [];
      }
    })



    //

    let param = {
      "projection": ['*'],
      "whereConditions": { "user_id": data }
    }
    this.ApiParameterScript.fetchdata('edited_plan_details', param).subscribe((getprofile_res: any) => {
      if (getprofile_res.success && getprofile_res['data'].length > 0) {
        this.planRemaingFeature = getprofile_res['data'][0];
      }
    })
  }

  editedPlan(data:any){
    let param1 = {
      "projection": ['*'],
      "whereConditions": { "user_id": data }
    }
    this.ApiParameterScript.fetchdata('left_plan', param1).subscribe((getprofile_res: any) => {

      if (getprofile_res.success && getprofile_res['data'].length > 0) {
          this.editedplandetails = getprofile_res['data'];
          console.log(this.editedplandetails);

      }
    });
  }

}
