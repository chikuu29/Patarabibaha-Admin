import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-page-for-membershipplan',
  templateUrl: './view-page-for-membershipplan.component.html',
  styleUrls: ['./view-page-for-membershipplan.component.scss']
})
export class ViewPageForMembershipplanComponent implements OnInit {
  deatils: any;
  user_Data: any
  constructor(
    public modal: NgbActiveModal,
    private ApiParameterScript: ApiParameterScript,
  ) { }



  ngOnInit(): void {
    this.ApiParameterScript.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { membership_plan_id: this.user_Data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.deatils = res['data'][0];
      }
    });
  }
  makedefultplan(Id: any, membership_plan_default: any) {
    if (membership_plan_default == 1) {
      Swal.fire({
        icon: 'warning',
        text: "Do not worry it's Your Defult plan"
      }).then(()=>{
        this.ngOnInit();
      })
    }else if(membership_plan_default == 0) {
      let updateData = {
        "data": {
          'membership_plan_default': 0,
        },
        "whereConditions": { membership_plan_default: 1 }
      }
      this.ApiParameterScript.updatedata('membership_plan', updateData).subscribe((res: any) => {
        if (res.status) {
          let updateData = {
            "data": {
              'membership_plan_default': 1,
            },
            "whereConditions": { Id: Id }
          }
          this.ApiParameterScript.updatedata('membership_plan', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "Done"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })
        }
      })
    }
  }

}
