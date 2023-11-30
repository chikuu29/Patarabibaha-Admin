import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phonevalidation',
  templateUrl: './phonevalidation.component.html',
  styleUrls: ['./phonevalidation.component.scss']
})
export class PhonevalidationComponent implements OnInit {

  finaldata: any;
  filterText:any;
  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.fatch();
  }
  fatch() {
    let Quary =
      'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID WHERE a.user_phone_varification = 0';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  approve(data:any){
    Swal.fire({
      icon: 'question',
      text: 'Do You Want to Approve'
    }).then((r: any) => {

      if (r.isConfirmed) {
        let updateData = {
          "data": {
            "user_phone_varification": 1,
          },
          "whereConditions": { id: data }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: "Approved"
            }).then(() => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message
            });
          }
        })

      }
    });
  }

}
