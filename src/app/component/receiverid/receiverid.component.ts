import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-receiverid',
  templateUrl: './receiverid.component.html',
  styleUrls: ['./receiverid.component.scss']
})
export class ReceiveridComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  finaldata: any = [];
  filterText: string;
  page: any = 1;
  collectionSize: any = 10
  pegination_required: boolean = false
  currentFunction: string = 'getAllData';
  senderid: any;
  constructor(
    private router:Router,
    private ApiParameter:ApiParameterScript,
    private activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.page = 1;
    this.collectionSize = 10
    let _this:any = this;
    this.activatedroute.params.subscribe((res:any)=>{
      console.log(res);
      if(res.id != ''){
        _this[this.currentFunction](this.page * 10 - 10, 10,res.id);
        this.senderid = res.id
      }
    });

    // this.getAllData(0, 10);
    // this.date = new Date();
  }
  userpage(receverdata: any,senderdata:any) {
    let encryptSecretKey = 'Lipun@123';
    let data = {
      'senderData' : senderdata,
      'recevirData' : receverdata
    }
   let ids =  CryptoJS.AES.encrypt(JSON.stringify(data),encryptSecretKey).toString();
    //alert(senderdata);
    this.router.navigate(['/chatingpage',ids]);
  }
  getAllData(start: number, limit: number, data?:any,loadSpecificData: boolean = false, search_text?: any) {
    this.pegination_required = true
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID WHERE a.user_id <> '${data}'
      LIMIT ${limit} OFFSET ${start}`;
      console.log(quary);
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    console.log(quary);



    // console.log(quary);
    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        this.collectionSize = Math.round(res['data'][0].total_count);
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }else{
        this.collectionSize = 1;
        this.finaldata = [];
      }
    });
  }
  getSearchText(event: any) {
    this.filterText = event
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * 10 - 10, 10);
    //this.getAllData(this.page * 10 - 10, 10)
  }
  fillter(event: any) {
    // console.log("click fillter", event);
    var query = `SELECT *
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`
    if (event.isqueryGenerated) {
      query = `SELECT *
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}`
    }
    //console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length
        // this.collectionSize=
        // console.log(this.collectionSize);

        this.finaldata = res['data'];
        // console.log(this.finaldata);
      }

    })

  }

  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)

  }

}
