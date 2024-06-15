import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  img: any;
  image: any;
  url: any = environment.filePath + 'storage/logo_image/';
  public imageSrc: string = '';
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
  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  currentFunction: string = 'fatchdata';
  constructor(
    private CommonService: CommonService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.allId = [];
    this.fatchdata(0, this.apiFetchRecordLimit);
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;

  }

  submit() {
    this.CommonService.logoUplode({
      image: this.imageSrc,
      date: moment().toISOString(),
    }).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          icon: 'success',
          text: res.message,
        }).then(() => {
          this.ngOnInit();
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: res.message,
        });
      }
    });
  }

  fatchdata(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT * , COUNT(*) OVER () AS total_count from logo_table
      ORDER BY created_At DESC
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT * , COUNT(*) OVER () AS total_count from logo_table
      WHERE created_At = '${search_text}'
         ORDER BY a.user_creation_date_time DESC
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
  }

  delete(id: any) {
    Swal.fire({
      icon: 'question',
      text: 'Do You Want to Delete',
    }).then((r: any) => {

      if (r.isConfirmed) {
        this.blockUI.start('Deleting...');
        this.ApiParameter.deletedata('logo_table', {
          whereConditions: { id: id },
        }).subscribe((res: any) => {
          this.blockUI.stop();
          if (res.success) {
            Swal.fire('Success', res.message, 'success').then(() => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('Error', res.message, 'error');
          }
        });
      }
    });
  }

  publish(id: any, status: any) {
    if (status == 1) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want to Unpublish',
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            whereConditions: { id: id },
          };
          this.ApiParameter.updatedata('logo_table', updateData).subscribe(
            (res: any) => {

              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  text: 'Unpublished',
                }).then(() => {
                  this.ngOnInit();
                });
              } else {
                Swal.fire({
                  icon: 'warning',
                  text: res.message,
                });
              }
            }
          );
        }
      });
    } else if (status == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Do You Want to Publish',
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            whereConditions: { id: id },
          };
          this.ApiParameter.updatedata('logo_table', updateData).subscribe(
            (res: any) => {

              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  text: 'Published',
                }).then(() => {
                  this.ngOnInit();
                });
              } else {
                Swal.fire({
                  icon: 'warning',
                  text: res.message,
                });
              }
            }
          );
        }
      });
    }
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

  checkAll(e: any) {
    let check = document.querySelectorAll('.check');


    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {


        this.allId.push(parseInt(this.tableData[key].Id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any, key: any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }

  }

  getId(id: any, e: any) {


    if (e.target.checked) {
      this.allId.push(parseInt(id));
    } else {
      let index = this.allId.indexOf(parseInt(id));
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }

  }
}
