import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-loginactivity',
  templateUrl: './loginactivity.component.html',
  styleUrls: ['./loginactivity.component.scss']
})
export class LoginactivityComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // **************************
  login_activity: any;
  filterText: any;
  class1: string = 'btn btn-primary btn-lg btn-block';
  class2: string = 'btn btn-primary btn-lg btn-block d-none';
  countele: any;
  femaleclass: any;
  maleclass: any;
  name: string = 'FEMALE';
  finaldata: any = [];
  alldata: any;
  defultdata: any;
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'fatchdata';
  totalDataCount: any;
  totalFetchrecord: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private CommonService: CommonService
  ) { }

  ngOnInit(): void {
    let _this: any = this;
    _this[this.currentFunction](0, this.apiFetchRecordLimit);
  }
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this
    _this[this.currentFunction](0, Number(event.target.value));
  }
  getSearchText(event: any) {
    this.filterText = event
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset = this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)

  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  details(data: string) {
    let kye = 'Lipun';
    let encripted = CryptoJS.AES.encrypt(JSON.stringify(data), kye).toString();
    this.router.navigate(['login-activity/details/', encripted]);
  }
  fatchdata(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    let quary = `SELECT a.user_id, COUNT(*) AS count ,COUNT(*) OVER () AS total_count
    FROM login_activity AS a
    LEFT JOIN user_info AS b ON a.user_id = b.user_id
    LEFT JOIN auth_user AS c ON a.user_id = c.auth_ID
    GROUP BY  a.user_id
    ORDER BY a.login_date_time DESC
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      quary = `SELECT a.user_id, COUNT(*) AS count ,COUNT(*) OVER () AS total_count
    FROM login_activity AS a
    LEFT JOIN user_info AS b ON a.user_id = b.user_id
    LEFT JOIN auth_user AS c ON a.user_id = c.auth_ID
    GROUP BY a.user_id
    ORDER BY a.login_date_time DESC
    WHERE a.user_id = '${search_text}'
     OR c.auth_ID = '${search_text}'
     OR b.user_fname = '${search_text}'
     OR b.user_lname = '${search_text}'
     OR c.auth_phone_no like '%${search_text}%'
   `;
    }
    console.log(quary);
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.login_activity = res['data'];
      } else {
        this.collectionSize = 1;
        this.login_activity = [];
      }
      console.log(this.login_activity);
    });
  }
}
