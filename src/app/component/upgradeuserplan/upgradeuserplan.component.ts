import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpgradePaymentProcessTaskComponent } from 'src/app/shared/upgrade-payment-process-task/upgrade-payment-process-task.component';

@Component({
  selector: 'app-upgradeuserplan',
  templateUrl: './upgradeuserplan.component.html',
  styleUrls: ['./upgradeuserplan.component.scss']
})
export class UpgradeuserplanComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  finaldata: any = [];
  alldata: any;
  defultdata: any;
  filterText: string;
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  currentFunction: string = 'getAllData';
  pegination_required: boolean = false
  tableData: any;
  totalDataCount: any;
  totalFetchrecord: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let _this: any = this
    _this[this.currentFunction](0, this.apiFetchRecordLimit);
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
  }
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this
    _this[this.currentFunction](0, Number(event.target.value));
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset = this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }

  getSearchText(event: any) {
    this.filterText = event
  }
  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"], "whereConditions": { membership_plan_default: 1 } }).subscribe((res: any) => {
      console.log(res['data'][0].membership_plan_type);
      this.defultdata = res['data'][0].membership_plan_type;
      if (res.success && res['data'].length > 0) {
        let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE user_membership_plan_type <> '${this.defultdata}'
      ORDER BY a.user_creation_date_time DESC
      LIMIT ${limit} OFFSET ${start}`;
        if (loadSpecificData) {
          quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         AND a.user_membership_plan_type <> '${this.defultdata}';
       `;
        }
        this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
          this.blockUI.stop()
          console.log(res);
          if (res.success && res['data'].length > 0) {
            this.totalDataCount = res['data'][0].total_count;
            this.totalFetchrecord = start + res['data'].length
            this.collectionSize = Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
            console.log(this.collectionSize);
            this.tableData = res['data'];
          } else {
            this.collectionSize = 1;
            this.tableData = [];
          }
        });
      }

    });
    console.log(this.tableData);

  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  makeMemberAsPaid(data: any) {
    const modalRef = this.modalService.open(UpgradePaymentProcessTaskComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }

}
