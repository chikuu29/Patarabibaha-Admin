import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-zodiacs',
  templateUrl: './zodiacs.component.html',
  styleUrls: ['./zodiacs.component.scss'],
})
export class ZodiacsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  zodiacs: any;
  zodiacsalldata: any;
  filterText: any;
  collectionSize: number = 0;
  page: number = 1;
  country: any;
  countryalldata: any;
  count: number = 0;
  tableSize: number = 10;
  options = [10, 15, 50, 100, 500, 1000];
  button: any = 'ADD';
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  offset = 1;
  allId: any[] = [];
  pegination_required: any;
  apiFetchRecordLimit: any = 10;
  currentFunction: string = 'getAllZodiacdata';
  totalDataCount: any;
  tableData: any;
  countryOption: any[] = [];
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.getAllZodiacdata(0, this.apiFetchRecordLimit);
    console.log(this.allId);

  }

  getSearchText(event: any) {
    console.log(event);

    this.filterText = event;
  }
  showFilterData() {
    let param = {
      rasi: this.zodiacs,
      status: 24,
    };
    this.api.zodiacs(param).subscribe((res: any) => {
      // console.log(res);
      if (res.status) {
        this.zodiacsalldata = res.message;
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

  getAllZodiacdata(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM zodiacs
      ORDER BY name ASC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM zodiacs
      ORDER BY name ASC
      WHERE name = '${search_text}'
         ORDER BY name ASC
       `;
    }
    //console.log(quary);
    // console.log("query",quary);

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);

      this.blockUI.stop();

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });

    // let param = {
    //   'status': 23
    // }
    // // let offset = this.page * 10 - 10
    // this.api.zodiacs(param).subscribe((res: any) => {
    //   // this.totalFetchrecord = offset+res['count']
    //   // this.totalCount = res['totalCount']
    //   // this.collectionSize = res['totalCount']
    //   // console.log(res);
    //   if (res.status) {
    //     this.zodiacsalldata = res.message
    //   }
    // });
  }

  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    console.log(check);

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        console.log('p');

        this.allId.push(parseInt(this.tableData[key].id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any, key: any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }
    console.log(this.allId);
  }
  getId(id: any, e: any) {
    console.log('hii', e);

    if (e.target.checked) {
      this.allId.push(parseInt(id));
    } else {
      let index = this.allId.indexOf(parseInt(id));
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
    console.log(this.allId);
  }

  publishuser() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to publish',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            type: 'Publish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'zodiacs',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'publish',
              }).then((s: any) => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  unpublishuser() {
    // alert(data);
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to  Unpublish',
        showCancelButton: true,
      }).then((r: any) => {
        //console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            type: 'UnPublish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'zodiacs',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Unpublish',
              }).then(() => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            }
          });
        }
      });
    }
  }
  // deletedata() {
  //   if (this.allId.length == 0) {
  //     Swal.fire('Warning', 'Please select any record', 'warning');
  //   } else {
  //     Swal.fire({
  //       icon: 'question',
  //       text: 'Do you want to Delete',
  //       showCancelButton: true,
  //     }).then((r: any) => {
  //       console.log(r);
  //        if (r.isConfirmed) {
  //         let updateData = {
  //               data: {
  //                 deleted: 0,
  //               },
  //               type: 'Delete',
  //               whereConditions: this.allId,
  //             };
  //         this.ApiParameter.deletedata(
  //               'zodiacs',
  //               updateData
  //             ).subscribe((res: any) =>{

  //             })
  //       //   let updateData = {
  //       //     data: {
  //       //       deleted: 0,
  //       //     },
  //       //     type: 'Delete',
  //       //     whereConditions: this.allId,
  //       //   };
  //       //   this.ApiParameter.makeActinForMultipulData(
  //       //     'zodiacs',
  //       //     updateData
  //       //   ).subscribe((res: any) => {
  //       //     if (res.success) {
  //       //       Swal.fire({
  //       //         icon: 'success',
  //       //         text: 'deleted',
  //       //       }).then(() => {
  //       //         this.ngOnInit();
  //       //       });
  //       //     } else {
  //       //       Swal.fire({
  //       //         icon: 'warning',
  //       //         text: res.message,
  //       //       });
  //       //     }
  //       //   });
  //        }
  //     });
  //   }
  // }
}
