import { Component, OnInit,AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-contactview',
  templateUrl: './contactview.component.html',
  styleUrls: ['./contactview.component.scss']
})
export class ContactviewComponent implements OnInit {


  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;
  @BlockUI() blockUI: NgBlockUI;
  // **************************

  alldata: any;
  tableData: any = [];
  filterText: string;
  allId: any[] = [];
  apiFetchRecordLimit=10
  options = [10,15,50,100,500,1000];
  page: any = 1;
  collectionSize: any = 10
  offset=1;
  pegination_required: boolean = false
  currentFunction: string = 'getAllData';
  totalDataCount: number = 0
  totalFetchrecord:number=0
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allId = [];
    this.getAllData(0, this.apiFetchRecordLimit);
  }

  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    this.pegination_required = true
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM user_activities_for_contact_details
      ORDER BY created_At DESC
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM user_activities_for_contact_details
      WHERE profile_view_by_profile_id = '${search_text}'
         OR profile_view_by_name   = '${search_text}'
         OR viewed_profile_id = '${search_text}'
         OR viewed_profile_name = '${search_text}'
         ORDER BY created_At DESC ;
       `;
    }



    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
     // console.log(res);


      if (res.success && res['data'].length > 0) {

        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count/this.apiFetchRecordLimit)*10;

        this.tableData = res['data'];
        console.log(this.tableData);

      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }


  getSearchText(event: any) {
    this.filterText = event
  }
  changepaginetdata(event:any){
    this.page = 1;
    this.offset=1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this
    _this[this.currentFunction](0, Number(event.target.value));
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


    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length
        // this.collectionSize=


        this.tableData = res['data'];

      }

    })

  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset=this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }

}
