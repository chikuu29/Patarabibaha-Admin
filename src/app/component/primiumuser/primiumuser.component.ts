import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-primiumuser',
  templateUrl: './primiumuser.component.html',
  styleUrls: ['./primiumuser.component.scss'],
})
export class PrimiumuserComponent implements OnInit {
  alldata: any;
  tableData: any = [];
  filterText: string;
  allId: any[] = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getAllData';
  defultdata: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private cdr: ChangeDetectorRef // ChangeDetectorRef added
  ) {}

  ngOnInit(): void {
    this.allId = [];
    this.ApiParameter.fetchdata('membership_plan', {
      projection: ['*'],
      whereConditions: { membership_plan_default: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.defultdata = res['data'][0].membership_plan_type;
        this.getAllData(0, this.collectionSize);
      }
    });

    this.allId = [];
    this.page = 1;
    this.collectionSize = 10;
  }
  getAllData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
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
         OR a.user_gender = '${search_text}'
         AND a.user_membership_plan_type <> '${this.defultdata}';
       `;
    }


    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.tableData = res['data'];

        this.cdr.detectChanges(); // Manually trigger change detection
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
  }
  fillter(event: any, start = 0) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';

    var query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`;
    if (event.isqueryGenerated) {
      query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}`;
    }



    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;

        this.tableData = res['data'];
        this.currentFunction = 'fillter';
      } else {
        this.collectionSize = 1;
        this.tableData = [];
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
