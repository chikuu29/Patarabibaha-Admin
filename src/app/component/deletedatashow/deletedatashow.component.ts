import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-deletedatashow',
  templateUrl: './deletedatashow.component.html',
  styleUrls: ['./deletedatashow.component.scss']
})
export class DeletedatashowComponent implements OnInit {
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

  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allId = [];
    this.page = 1;
    this.collectionSize = 10;
    this.getAllData(0,this.collectionSize);
  }
  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    let Quary =
      `select * ,COUNT(*) OVER () AS total_count from user_delete_request
      where states = 1
      LIMIT ${limit} OFFSET ${start}`;
      if (loadSpecificData) {
        Quary = `select * ,COUNT(*) OVER () AS total_count from user_delete_request
        where states = 1 AND
      OR user_name = '${search_text}'
      OR user_phone_number = '${search_text}'
      OR user_whatsapp_number = '${search_text}'
      OR user_id  = '${search_text}'`
      }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
        this.tableData = res['data'];
        console.log(this.tableData);
      }
    });
  }



  getSearchText(event: any) {
    this.filterText = event;
  }
  search(search_text: any) {
    let _this: any = this;
    _this[this.currentFunction](0, 10, true, search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any, start = 0) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';
    console.log('click fillter', event);
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

    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
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
