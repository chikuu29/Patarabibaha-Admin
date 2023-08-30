import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-payment-processing-task',
  templateUrl: './member-payment-processing-task.component.html',
  styleUrls: ['./member-payment-processing-task.component.scss']
})
export class MemberPaymentProcessingTaskComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: string;
  user_Data:any
  palnType: string;
  paymentType:string
  seasons: string[] = [];
  planInformation:any
  constructor(
    public modal: NgbActiveModal,
    private AppService:AppService,
    private ApiParameterScript:ApiParameterScript
  ) { }

  ngOnInit(): void {
    console.log(this.user_Data);

    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
       console.log(res);
       this.seasons= _.uniq(_.map(res['data'], 'membership_plan_type'))

      }
    })


    
  }

  getPlandetails(plan_type:any){
    console.log(plan_type);

    this.blockUI.start("Fetching Plan Information")
     this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"],"whereConditions":{"membership_plan_type":plan_type} }).subscribe((res: any) => {

      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
       console.log(res);
       this.planInformation=res['data'][0]
       

      }
    })
  }

  upgradePlan(){
    var processing_data={
      "paymentType":this.paymentType,
      "palnType":this.palnType,
      "plan_amount":this.planInformation.membership_plan_amount,
      "planInformation":this.planInformation
    }
    if(this.palnType && this.paymentType){
      console.log("data",processing_data);
    }else{
      
      Swal.fire(
        "Please Select Payment Type",
        "",
        'error'
      )

    }
   

    
  }

}
