import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-loginactivityall',
  templateUrl: './loginactivityall.component.html',
  styleUrls: ['./loginactivityall.component.scss']
})
export class LoginactivityallComponent implements OnInit {
  user_id: any;
  alldataoflogin: any;
  userdata: any;
  filterText:any;
  login_activity: any;
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
  currentFunction: string = 'alldatalogin';
  totalDataCount: any;
  totalFetchrecord: any;

  constructor(
    private router: Router,
    private CommonService:CommonService,
    private activatedroute:ActivatedRoute,
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res:any)=>{
      let encryptSecretKey = 'Lipun';
      let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.user_id = data;
      this.alldatalogin(this.user_id);
      this.getDataFromUserInfo(this.user_id);
    });
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
    
    // this.getAllData(0, 10, true, search_text)

  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  showhide() {
    this.router.navigate(['/login-activity/today']);
  }
  alldatalogin(data:any){
    this.ApiParameter.fetchdata('login_activity', { "projection": ["*"] ,"whereConditions": { user_id : data }}).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.login_activity = res['data'];
      }
    })
  }
  getDataFromUserInfo(data:any){
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] ,"whereConditions": { user_id : data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.userdata = res['data'][0];
        

      }
    });
  }

}
