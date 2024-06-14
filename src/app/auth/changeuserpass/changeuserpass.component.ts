import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-changeuserpass',
  templateUrl: './changeuserpass.component.html',
  styleUrls: ['./changeuserpass.component.scss'],
})
export class ChangeuserpassComponent implements OnInit {
  finaldata: any;
  filterText: any;
  alldata: any;
  tableData: any = [];

  allId: any[] = [];

  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getAllData';
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllData(0, this.totalFetchrecord);
  }
  userpage(data: any, fname: any, lname: any) {
    let kye = 'Lipun';
    let alldata = data + ':' + fname + ':' + lname;
    let encripted = CryptoJS.AES.encrypt(
      JSON.stringify(alldata),
      kye
    ).toString();
    this.router.navigate(['auth/2wayverification', encripted]);
  }

  getAllData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let Quary = `select * ,COUNT(*) OVER () AS total_count from user_info as a inner join auth_user as b on a.user_id = b.auth_ID
      ORDER BY a.user_creation_date_time DESC
      LIMIT ${limit} OFFSET ${start};
      `;
    if (loadSpecificData) {
      Quary = `select * ,COUNT(*) OVER () AS total_count from user_info as a inner join auth_user as b on a.user_id = b.auth_ID
            WHERE
            user_id = '${search_text}'
           OR a.user_full_name = '${search_text}'
           OR a.user_email = '${search_text}'
           OR b.auth_phone_no = '${search_text}'
           OR a.user_gender = '${search_text}'
           ORDER BY user_creation_date_time DESC ;
            `;
    }
    

    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        
        this.tableData = res['data'];
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }

  getSearchText(event: any) {
    this.filterText = event;
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    
    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any) {
    
    var query = `SELECT *
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`;
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
    ${event.whereConditions}`;
    }
    

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length;
        // this.collectionSize=
        

        this.tableData = res['data'];
        
      }
    });
  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit,
      this.apiFetchRecordLimit
    );
    this.offset =
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit;
  }

  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
}
