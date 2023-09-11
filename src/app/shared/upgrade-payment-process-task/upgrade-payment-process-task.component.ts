import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
    private Router: Router

  ) { }

  ngOnInit(): void {
    console.log(this.user_Data);

    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.seasons = res['data'].filter((elemrnt: any) => {
          if (elemrnt.membership_plan_default == 0 && elemrnt.membership_plan_type != this.user_Data.user_membership_plan_type ) {
            return elemrnt;
          }
        });
      }
    });

  }

  upgradePlan() {
    var processing_data = {
      "paymentType": this.paymentType,
      "palnType": this.palnType,
      "plan_amount": this.planInformation.membership_plan_amount,
      "planInformation": this.planInformation,
      "id": this.user_Data.user_id
    }
    if (this.palnType && this.paymentType) {
      console.log("data", processing_data);
      let dev = this;
      Swal.fire({
        icon: 'question',
        text: "Do you want upgrade Mr/Ms " + this.user_Data.user_fname + " " + this.user_Data.user_lname + " 's plan"
      }).then((r: any) => {
        // console.log(r);
        if (r.isConfirmed) {
          let param = {
            "data": {
              "user_membership_plan_type": this.palnType,
            },
            "whereConditions": { user_id: this.user_Data.user_id }
          }
          this.ApiParameterScript.updatedata('user_info', param).subscribe((res: any) => {
            if (res.success) {
              let param_user = {
                "data": {
                  "active_status": 0,
                },
                "whereConditions": { user_id: this.user_Data.user_id }
              }
              this.ApiParameterScript.updatedata('user_plan_deatils', param_user).subscribe((res: any) => {

                if (res.success) {
                  let days = Number(this.planInformation.membership_plan_validity_date);
                  let new_date = moment().add(days, 'days').format("YYYY-MM-DD HH:mm:ss").toString();
                  console.log(new_date);
                  console.log();

                  let param_user_insert = {
                    "data": {
                      "user_id": this.user_Data.user_id,
                      "user_email": this.user_Data.user_email,
                      "user_plan_type": this.palnType,
                      "user_plan_id": this.planInformation.membership_plan_id,
                      "plan_stating_date": moment().format("YYYY-MM-DD HH:mm:ss").toString(),
                      "plan_ending_date": new_date
                    }
                  }
                  this.ApiParameterScript.savedata('user_plan_deatils', param_user_insert).subscribe((res: any) => {
                    if (res.success) {
                      Swal.fire({
                        icon: 'success',
                        text: this.user_Data.user_fname + " " + this.user_Data.user_lname + " 's Plane Upgrated "
                      }).then((re: any) => {
                        this.modal.close()
                      })
                    } else {
                      Swal.fire({
                        icon: 'error',
                        text: "Somethings Went Wrong"

                      });
                    }
                  });

                } else {
                  Swal.fire({
                    icon: 'error',
                    text: "Somethings Went Wrong While updating plan"

                  });
                }


              })
            } else {
              Swal.fire({
                icon: 'error',
                text: "Somethings Went Wrong"

              });
            }
          });
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

}
