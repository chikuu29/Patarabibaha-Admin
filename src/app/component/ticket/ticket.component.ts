import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketviewComponent } from './ticketview/ticketview.component';
TicketviewComponent
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getalltable';
  filterText: any;
  tableData: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  constructor(
    private ApiParameter: ApiParameterScript,
    private apiservice: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getallFeedback(0, this.totalFetchrecord);
  }
  getallFeedback(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let query = ` SELECT *,COUNT(*) OVER () AS total_count FROM contact_admin
                ORDER BY created_At DESC
              LIMIT ${limit} OFFSET ${start};`;
    this.ApiParameter.fetchDataFormQuery(query).subscribe((resd: any) => {
      if (resd.success && resd['data'].length > 0) {
        
        this.tableData = resd['data'];
        this.totalDataCount = resd['data'][0].total_count;
        
        this.totalFetchrecord = start + resd['data'].length;
        this.collectionSize =
          Math.ceil(resd['data'][0].total_count / this.apiFetchRecordLimit) *
          10;
        
        this.tableData = resd['data'];
      }
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
  show(data: any) {
    const dialogRef =  this.dialog.open(TicketviewComponent, {
      width: '400px',
      data: { id: data }, // Adjust width as needed
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.ngOnInit(); // Run ngOnInit when the dialog is closed
    });
  }
  // responded(data:any,status:any){

  //   if(status == 1){
  //     this.dialog.open(ViewsubfeedbackComponent, {
  //       width: '400px',
  //       data: { id: data }, // Adjust width as needed
  //     });
  //   }else if(status == 0){
  //     this.dialog.open(ViewsubfeedbackComponent, {
  //       width: '400px',
  //       data: { id: data }, // Adjust width as needed
  //     });
  //   }

  // }

}
