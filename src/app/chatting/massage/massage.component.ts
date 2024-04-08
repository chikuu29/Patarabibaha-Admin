import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss'],
})
export class MassageComponent implements OnInit {
  alldata: any;
  finaldata: any;
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  tableData: any = [];
  filterText: string;

  allId: any[] = [];
  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'fatchhdata';
  cahting = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
  });
  button: any = 'ADD';
  massagedata: any;
  constructor(private ApiParameter: ApiParameterScript) {}

  ngOnInit(): void {
    this.cahting = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
    });
    let _this: any = this;
    _this[this.currentFunction](0, this.apiFetchRecordLimit);
  }

  addMessage() {
    if (this.button == 'ADD') {
      if (this.cahting.valid) {
        let updateData = {
          data: {
            name: this.cahting.value.name,
            created_At: moment().toISOString(),
          },
        };
        this.ApiParameter.savedata('message', updateData).subscribe(
          (res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
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
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data',
        });
      }
    } else if ((this.button = 'UPDATE')) {
      if (this.cahting.valid) {
        let updateData = {
          data: {
            name: this.cahting.value.name,
          },
          whereConditions: { id: this.cahting.value.id },
        };
        this.ApiParameter.updatedata('message', updateData).subscribe(
          (res: any) => {
            // console.log(res);
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
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
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data',
        });
      }
    }
  }

  fatchhdata(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let Quary = `SELECT *, COUNT(*) OVER () AS total_count
    FROM message
    ORDER BY created_At DESC
    LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      Quary = `select * ,COUNT(*) OVER () AS total_count from message
      WHERE
      name = '${search_text}'
    `;
    }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }
  update(data: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.ApiParameter.fetchdata('message', {
      projection: ['*'],
      whereConditions: { id: data },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.button = 'UPDATE';
        this.cahting.patchValue(res['data'][0]);
        //console.log(this.statealldatabycountry);
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
    //console.log(query);

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
  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    console.log(check);

    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        console.log('p');

        this.allId.push(parseInt(this.finaldata[key].id));
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
            'message',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'publish',
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
            'message',
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
}
