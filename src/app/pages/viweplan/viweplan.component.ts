import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { ViewPageForMembershipplanComponent } from 'src/app/shared/view-page-for-membershipplan/view-page-for-membershipplan.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viweplan',
  templateUrl: './viweplan.component.html',
  styleUrls: ['./viweplan.component.scss']
})
export class ViweplanComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
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
  currentFunction: string = 'getallplain';
  allplandata: any;
  planOptionType: any[] = [
    { name: "FREE_PLAN" },
    { name: "DIMOND_PLAN" },
    { name: "GOLD_PLAN" },
  ]
  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  finaldata: any;
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private ApiParameterScript: ApiParameterScript,
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) { }



  statuses!: any[];

  clonedProducts: { [s: string]: any } = {};



  ngOnInit(): void {
    this.getallplain(0, this.apiFetchRecordLimit);
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
    
    // this.getAllData(0, 10, true, search_text)
  }
  fillter(event: any) {
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
        this.collectionSize = res['data'].length;
        this.offset = 1;
        this.totalFetchrecord = this.collectionSize;
        this.tableData = res['data'];
        
      } else {
        this.offset = 0;
        this.totalFetchrecord = 0;
        this.collectionSize = 0;
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















  getallplain( start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any) {

      this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM membership_plan
      ORDER BY membership_plan_created_date_time DESC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM membership_plan
      WHERE membership_plan_id = '${search_text}'
         OR membership_plan_type = '${search_text}'
         OR membership_plan_name = '${search_text}'
         ORDER BYmembership_plan_created_date_time DESC
       `;
    }

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop();

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











    this.ApiParameter.fetchdata('membership_plan', { "projection": ["*"] }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        

      }
    })
  }

  edite(data: any) {
    this.router.navigate(['/addplan-page', data]);
  }

  view(data: any) {
    ///alert(data);
    const modalRef = this.modalService.open(ViewPageForMembershipplanComponent, { size: 'lg' })
    modalRef.componentInstance.user_Data = data
  }
  publish(id: any, states: any) {
    //alert(id +' '+states)
    if (states == 1) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want Unpublish'
      }).then((respo: any) => {
        if (respo.isConfirmed) {
          let updateData = {
            "data": {
              'membership_plan_status': 0,
            },
            "whereConditions": { Id: id }
          }
          this.ApiParameterScript.updatedata('membership_plan', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "Unpublished"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })
        }
      });
    }
    else if (states == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want Publish'
      }).then((respo: any) => {
        if (respo.isConfirmed) {

          let updateData = {
            "data": {
              'membership_plan_status': 1,
            },
            "whereConditions": { Id: id }
          }
          this.ApiParameterScript.updatedata('membership_plan', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "Published"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })
        }
      });
    }
  }



}
