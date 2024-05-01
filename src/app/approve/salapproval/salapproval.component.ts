import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ImageViewOperationComponent } from 'src/app/shared/image-view-operation/image-view-operation.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salapproval',
  templateUrl: './salapproval.component.html',
  styleUrls: ['./salapproval.component.scss'],
})
export class SalapprovalComponent implements OnInit {
  useradata: any;
  imageurl: any = environment.filePath + 'storage/paymentslip/';
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getsalslip';
  tableData: any;
  filterText: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 10;
  constructor(
    private ApiParameter: ApiParameterScript,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getsalslip(0, this.totalFetchrecord);
  }

  getsalslip(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let query;
    if (loadSpecificData) {
      query = `
      SELECT use_payment_slip_upload.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM use_payment_slip_upload
      JOIN user_info ON use_payment_slip_upload.user_ID = user_info.user_id
      ORDER BY use_payment_slip_upload.status ASC, use_payment_slip_upload.id ASC
              AND (user_info.user_id = '${search_text}'
                   OR user_info.user_full_name = '${search_text}'
                   OR user_info.user_email = '${search_text}'
                   OR user_info.user_phone_no = '${search_text}')
            ORDER BY MAX(use_payment_slip_upload.id) DESC
            LIMIT ${limit} OFFSET ${start};
        `;
    } else {
      query = `
      SELECT use_payment_slip_upload.* ,user_info.user_full_name,user_info.user_phone_no,user_info.user_email,
      COUNT(*) OVER () AS total_count
      FROM use_payment_slip_upload
      JOIN user_info ON use_payment_slip_upload.user_ID = user_info.user_id
        ORDER BY use_payment_slip_upload.status ASC, use_payment_slip_upload.id ASC
            LIMIT ${limit} OFFSET ${start};
        `;
    }

    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
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
    // console.log("click fillter", event);
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
    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      //console.log(res);
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

  update(data: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do you want to Published',
      showCancelButton: true,
    }).then((ress: any) => {
      if (ress.isConfirmed) {
        let updateData = {
          data: {
            status: 1,
          },
          whereConditions: { user_id: data },
        };
        this.ApiParameter.updatedata(
          'use_horoscope_upload',
          updateData
        ).subscribe((resdata: any) => {
          if (resdata.success) {
            Swal.fire({
              icon: 'success',
              text: 'Published',
            }).then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: resdata.message,
            });
          }
        });
      }
    });
  }
}
