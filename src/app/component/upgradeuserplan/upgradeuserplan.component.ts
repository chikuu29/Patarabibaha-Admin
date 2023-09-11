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
    this. getAllData();
  }

  getAllData() {
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] , "whereConditions": { user_status: 'Approved' } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    })
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  makeMemberAsPaid(data: any) {
    const modalRef = this.modalService.open(UpgradePaymentProcessTaskComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }

}
