import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpgradePaymentProcessTaskComponent } from 'src/app/shared/upgrade-payment-process-task/upgrade-payment-process-task.component';

@Component({
  selector: 'app-upgradeuserplan',
  templateUrl: './upgradeuserplan.component.html',
  styleUrls: ['./upgradeuserplan.component.scss']
})
export class UpgradeuserplanComponent implements OnInit {
  finaldata: any;

  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {

    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { membership_plan_default: 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        console.log(res['data'][0].membership_plan_type);
        
        let Quary =  `SELECT * FROM user_info as a left join auth_user as b on a.user_id = b.auth_ID WHERE a.user_membership_plan_type <> "${res['data'][0].membership_plan_type}";`
        this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
          console.log(res);
          if (res.success && res['data'].length > 0) {
            this.finaldata = res['data'];
            console.log(this.finaldata);
          }
        });
      }

    });
    console.log(this.finaldata);

  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  makeMemberAsPaid(data: any) {
    const modalRef = this.modalService.open(UpgradePaymentProcessTaskComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }

}
