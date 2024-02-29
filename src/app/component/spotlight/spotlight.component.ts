import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss']
})
export class SpotlightComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  femaleclass: any;
  maleclass: any;
  name: string = 'FEMALE';
  finaldata: any = [];
  alldata: any;
  defultdata: any;
  filterText: string;
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'female';
  totalDataCount: any;
  totalFetchrecord: any;
  constructor(
    private router: Router,
    private ApiParameter: ApiParameterScript,
  ) { }

  ngOnInit(): void {
    this.change();
  }
  changepaginetdata(event:any){
    this.page = 1;
    this.offset=1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this
    _this[this.currentFunction](0, Number(event.target.value));
   }
   getSearchText(event:any){
    this.filterText=event
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset=this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
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
  change() {
    if (this.name == 'FEMALE') {
      
      this.name = 'MALE';
      this.page = 1;
      this.offset = 1;
      this.pegination_required = true;
      this.currentFunction = 'female';
      let _this: any = this;
      _this[this.currentFunction](0, this.apiFetchRecordLimit);
    } else if (this.name == 'MALE') {
      this.name = 'FEMALE'
      this.page = 1;
      this.offset = 1;
      this.pegination_required = true;
      this.currentFunction = 'male';
      let _this :any = this;
      _this[this.currentFunction](0, this.apiFetchRecordLimit);
    }
  }
   male(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {



    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_status = 'Approved' AND a.user_gender = 'male' AND spotlight = 0
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         AND a.user_status = 'Approved' AND a.user_gender = 'male' AND spotlight = 0;
       `;
    }
    console.log('mele');
    console.log(quary);
    
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.finaldata = res['data'];
      } else {
        this.collectionSize = 1;
        this.finaldata = [];
      }
      console.log(this.finaldata);
    });













    // this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: 'Approved', user_gender: 'male' ,spotlight:1 } }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.finaldata = res['data'];
    //     console.log(this.finaldata);
    //   }
    // })
  }
   female(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {


    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_status = 'Approved' AND a.user_gender = 'female' AND a.spotlight = 0
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         AND  AND a.user_status = 'Approved' AND a.user_gender = 'male' AND spotlight = 0;
       `;
    }
    console.log('female');
    console.log(quary);
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.finaldata = res['data'];
      } else {
        this.collectionSize = 1;
        this.finaldata = [];
      }
      
      
      console.log(this.finaldata);
      
    });
















    // this.ApiParameter.fetchdata('user_info', { "projection": ["*"], "whereConditions": { user_status: 'Approved', user_gender: 'female',spotlight:1 } }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {
    //     this.finaldata = res['data'];
    //     console.log(this.finaldata);
    //   }
    // })
  }




  makespotlight(fname: any, lname: any, id: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to make ' + fname + ' ' + lname + ' as spotlight profile'
    }).then((responcer: any) => {
      if (responcer.isConfirmed) {
        let updateData = {
          "data": {
            "spotlight": 1,
          },
          "whereConditions": { user_id: id }
        }
        this.ApiParameter.updatedata('user_info', updateData).subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: 'Now ' + fname + ' ' + lname + ' is a spotlight profile'
            }).then(()=>{
              let _this:any = this;
              _this[this.currentFunction](0, this.apiFetchRecordLimit);
              // if(this.name == 'MALE'){
              //   //this.name = 'MALE';
              //   this.female();
              // }else if(this.name == 'FEMALE'){
              //   ///this.name = 'FEMALE'
              //   this.male();
              // }
            }); 
          }
        });
      }
    })
  }
}
