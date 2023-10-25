import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

import * as moment from 'moment';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-member-payment-processing-task',
  templateUrl: './member-payment-processing-task.component.html',
  styleUrls: ['./member-payment-processing-task.component.scss']
})
export class MemberPaymentProcessingTaskComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: string;
  user_Data: any
  palnType: string;
  paymentType: string
  seasons: any = [];
  planInformation: any
  constructor(
    public modal: NgbActiveModal,
    private AppService: AppService,
    private ApiParameterScript: ApiParameterScript,
    private Router: Router,
    private commonservice:CommonService

  ) { }

  ngOnInit(): void {
   
    console.log(this.user_Data);
    console.log(this.user_Data.user_membership_plan_type);
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
       // console.log(res['data']);
        this.seasons = res['data'].filter((elemrnt: any) => {
          if (elemrnt.membership_plan_default == 0 && elemrnt.membership_plan_type != this.user_Data.user_membership_plan_type ) {
            return elemrnt;
          }
        });
        console.log(this.seasons);
      }
    });

  }

  getPlandetails(plan_type: any) {
    console.log(plan_type);

    this.blockUI.start("Fetching Plan Information")
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { "membership_plan_type": plan_type } }).subscribe((res: any) => {

      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        console.log(res);
        this.planInformation = res['data'][0]


      }
    })
  }

  upgradePlan() {
    let  processing_data = {
      "paymentType": this.paymentType,
      "palnType": this.palnType,
      "plan_amount": this.planInformation.membership_plan_amount,
      //"planInformation": this.planInformation,
      "curentplan" : this.user_Data.user_membership_plan_type,
      "planId" : this.planInformation.membership_plan_id,
      "id": this.user_Data.user_id
    }
    console.log(processing_data);
    
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



    } else {

      Swal.fire(
        "Please Select Payment Type",
        "",
        'error'
      )

    }



  }


  // if (r.isConfirmed) {
  //   let param = {
  //     "data": {
  //       "user_membership_plan_type": this.palnType,
  //     },
  //     "whereConditions": { user_id: this.user_Data.user_id }
  //   }
  //   this.ApiParameterScript.updatedata('user_info', param).subscribe((res: any) => {
  //     if (res.success) {
  //       let param_user = {
  //         "data": {
  //           "active_status": 0,
  //         },
  //         "whereConditions": { user_id: this.user_Data.user_id }
  //       }
  //       this.ApiParameterScript.updatedata('user_plan_deatils', param_user).subscribe((res: any) => {

  //         if (res.success) {
  //           let days = Number(this.planInformation.membership_plan_validity_date);
  //           let new_date = moment().add(days, 'days').format("YYYY-MM-DD HH:mm:ss").toString();
  //           // console.log(new_date);
  //           // console.log();

  //           let param_user_insert = {
  //             "data": {
  //               "user_id": this.user_Data.user_id,
  //               "user_email": this.user_Data.user_email,
  //               "user_plan_type": this.palnType,
  //               "user_plan_id": this.planInformation.membership_plan_id,
  //               "plan_stating_date": moment().format("YYYY-MM-DD HH:mm:ss").toString(),
  //               "plan_ending_date": new_date
  //             }
  //           }
  //           this.ApiParameterScript.savedata('user_plan_deatils', param_user_insert).subscribe((res: any) => {
  //             if (res.success) {
  //               Swal.fire({
  //                 icon: 'success',
  //                 text: this.user_Data.user_fname + " " + this.user_Data.user_lname + " 's Plane Upgrated "
  //               }).then((re: any) => {
  //                 this.modal.close()
  //               })
  //             } else {
  //               Swal.fire({
  //                 icon: 'error',
  //                 text: "Somethings Went Wrong"
                  
  //               });
  //             }
  //           });

  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             text: "Somethings Went Wrong While updating plan"
              
  //           });
  //         }


  //       })
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         text: "Somethings Went Wrong"
          
  //       });
  //     }
  //   });
  // }

}
