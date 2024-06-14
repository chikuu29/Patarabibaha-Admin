import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleterequest',
  templateUrl: './deleterequest.component.html',
  styleUrls: ['./deleterequest.component.scss'],
})
export class DeleterequestComponent implements OnInit {
  useradata: any;
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getuserAprrove';
  tableData: any;
  filterText: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getuserAprrove(0, this.totalFetchrecord);
  }
  getuserAprrove(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let quary = `SELECT a.*, b.*,
      COUNT(*) OVER () AS total_count
      FROM user_delete_request AS b
      INNER JOIN user_info AS a ON a.user_id = b.user_id
      where b.states = 0
      ORDER BY b.created_At DESC
      LIMIT ${limit} OFFSET ${start};
`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*,
      COUNT(*) OVER () AS total_count
      FROM user_delete_request AS b
      INNER JOIN user_info AS a ON a.user_id = b.user_id
        WHERE
        where b.states = 0
        OR
        a.user_id = '${search_text}'
       OR a.user_full_name = '${search_text}'
       OR a.user_email = '${search_text}'
       OR a.user_phone_no = '${search_text}'
       ORDER BY user_creation_date_time DESC ;
        `;
    }

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        console.log(this.totalDataCount);
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.tableData = res['data'];
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  deleted(data: any) {
    this.CommonService.deleteRequest({ id: data }).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
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
  fillter(event: any) {
    console.log('click fillter', event);
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
        // console.log(this.collectionSize);

        this.tableData = res['data'];
        // console.log(this.tableData);
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
  viewCase(data: any) {
    Swal.fire(data);
  }
  approve(data: any) {
    this.router.navigate(['/user', data]);
  }
}
