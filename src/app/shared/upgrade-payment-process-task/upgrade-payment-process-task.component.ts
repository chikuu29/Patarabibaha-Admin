import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-upgrade-payment-process-task',
  templateUrl: './upgrade-payment-process-task.component.html',
  styleUrls: ['./upgrade-payment-process-task.component.scss']
})
export class UpgradePaymentProcessTaskComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: string;
  user_Data: any
  palnType: string;
  paymentType: string
  seasons: any[] = [];
  planInformation: any
  constructor(
    public modal: NgbActiveModal,
    private AppService: AppService,
    private ApiParameterScript: ApiParameterScript,
    private Router: Router,
    private commonservice:CommonService

  ) { }

  ngOnInit(): void {
    
    
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
       
        this.seasons = res['data'].filter((elemrnt: any) => {
          if (elemrnt.membership_plan_default == 0  &&  elemrnt.membership_plan_status == 1 ) {
            // && elemrnt.membership_plan_type != this.user_Data.user_membership_plan_type
            return elemrnt;
          }
        });
        
      }
    });

  }

  upgradePlan() {
    var processing_data = {
      // "paymentType": this.paymentType,
      // "palnType": this.palnType,
      // "plan_amount": this.planInformation.membership_plan_amount,
      // "planInformation": this.planInformation,
      // "id": this.user_Data.user_id


      "paymentType": this.paymentType,
      "palnType": this.palnType,
      "plan_amount": this.planInformation.membership_plan_amount,
      //"planInformation": this.planInformation,
      "curentplan" : this.user_Data.user_membership_plan_type,
      "planId" : this.planInformation.membership_plan_id,
      "id": this.user_Data.user_id
    }
    if (this.palnType && this.paymentType) {
      Swal.fire({
        icon: 'question',
        text: "Do you want upgrade Mr/Miss " + this.user_Data.user_fname + " " + this.user_Data.user_lname + " 's plan"
      }).then((r: any) => {
        if (r.isConfirmed) {
          this.commonservice.updateEditedPlanDetails(processing_data).subscribe((res:any)=>{
            if(res.status){
              Swal.fire({
                icon:'success',
                text :res.message
              }).then(()=>{
                location.reload();
              });
            }
          })
        }
        
      })
    }




    else {

      Swal.fire(
        "Please Select Payment Type",
        "",
        'error'
      )

    }



  }

  getPlandetails(plan_type: any) {
    

    this.blockUI.start("Fetching Plan Information")
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { "membership_plan_type": plan_type } }).subscribe((res: any) => {

      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        
        this.planInformation = res['data'][0]


      }
    })
  }

}
