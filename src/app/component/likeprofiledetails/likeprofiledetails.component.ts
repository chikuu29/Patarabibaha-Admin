import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-likeprofiledetails',
  templateUrl: './likeprofiledetails.component.html',
  styleUrls: ['./likeprofiledetails.component.scss']
})
export class LikeprofiledetailsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: any;
  alldataoflike: any;
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
  defultdata: any;
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'alldata';
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
      this.alldata(this.user_id,0,this.collectionSize);
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
  alldata(data:any,start: number, limit: number, loadSpecificData: boolean = false, search_text?: any){


    let quary = `SELECT a.*, b.user_fname , b.user_lname ,
    COUNT(*) OVER () AS total_count
    FROM user_like AS a
    LEFT JOIN user_info AS b ON a.liked_by_profile_id = b.user_id
    LEFT JOIN auth_user AS c ON a.liked_by_profile_id = c.auth_ID
    WHERE a.isLiked = 1 AND a.liked_by_profile_id = '${data}'
    ORDER BY a.id DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.user_fname , b.user_lname,
      COUNT(*) OVER () AS total_count
    FROM user_like AS a
    LEFT JOIN user_info AS b ON a.liked_by_profile_id = b.user_id
    LEFT JOIN auth_user AS c ON a.liked_by_profile_id = c.auth_ID
    WHERE a.isLiked = 1 AND a.liked_by_profile_id = '${data}'
    ORDER BY a.id DESC
    WHERE a.liked_by_profile_id = '${search_text}'
     OR c.auth_ID = '${search_text}'
     OR b.user_fname = '${search_text}'
     OR b.user_lname = '${search_text}'
     OR c.auth_phone_no like '%${search_text}%'`;
    }

    
    
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        
        this.alldataoflike = res['data'];
      } else {
        this.collectionSize = 1;
        this.alldataoflike = [];
      }
      
    });

















    // this.ApiParameter.fetchdata('user_like', { "projection": ["*"] ,"whereConditions": { liked_by_profile_id : data }}).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.alldataoflike = res['data'].filter((ele:any)=>{
    //       if(ele.isLiked == 1){
    //         return ele;
    //       }
    //     });
    //   }
    // })
  }
  getDataFromUserInfo(data:any){
    this.ApiParameter.fetchdata('user_info', { "projection": ["*"] ,"whereConditions": { user_id : data } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.userdata = res['data'][0];
        
        
      }
    });
  }

}
