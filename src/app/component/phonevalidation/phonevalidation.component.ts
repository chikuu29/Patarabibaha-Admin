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
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  tableData: any = [];
  filterText: string;

  allId: any[] = [];
  totalDataCount: number = 0
  totalFetchrecord:number=0
  apiFetchRecordLimit = 10
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10
  offset = 1;
  pegination_required: boolean = false
  currentFunction: string = 'fatch';


  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.fatch(0,this.collectionSize);
  }
  fatch(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    let Quary =
      `select * ,COUNT(*) OVER () AS total_count from user_info as a left join auth_user as b on a.user_id = b.auth_ID WHERE a.user_phone_varification = 0
      LIMIT ${limit} OFFSET ${start}`;
      if (loadSpecificData) {
        Quary = `select * ,COUNT(*) OVER () AS total_count
        from user_info as a left join auth_user as b
        on a.user_id = b.auth_ID
        WHERE a.user_phone_varification = 0
        b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR a.user_fname = '${search_text}'
      OR a.user_lname = '${search_text}'
      OR b.auth_phone_no like '%${search_text}%'`
      }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
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
            "phone_no_request": 0
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
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)

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

        this.tableData = res['data'];
        // console.log(this.tableData);
      }

    })

  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset = this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }

}
