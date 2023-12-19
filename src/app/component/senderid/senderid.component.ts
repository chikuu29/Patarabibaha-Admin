import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-senderid',
  templateUrl: './senderid.component.html',
  styleUrls: ['./senderid.component.scss']
})
export class SenderidComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  finaldata: any = [];
  filterText: string;
  page: any = 1;
  collectionSize: any = 10
  pegination_required: boolean = false
  currentFunction: string = 'getAllData';
  constructor(
    private router:Router,
    private ApiParameter:ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.page = 1;
    this.collectionSize = 10
    let _this:any = this;
    _this[this.currentFunction](this.page * 10 - 10, 10)
    // this.getAllData(0, 10);
    // this.date = new Date();
  }
  userpage(data: any) {
    this.router.navigate(['/receiverid', data]);
  }
  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    this.pegination_required = true
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      LIMIT ${limit} OFFSET ${start}`;
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
   // console.log(quary);



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
