import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { offset } from '@popperjs/core';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contry',
  templateUrl: './contry.component.html',
  styleUrls: ['./contry.component.scss'],
})
export class ContryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  countrygroup = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
  });
  filterText: any;
  collectionSize: number = 0;
  country: any;
  countryalldata: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  options = [10, 15, 50, 100, 500, 1000];
  button: any = 'ADD';
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  offset = 1;
  allId: any[];
  pegination_required: any;
  apiFetchRecordLimit: any = 10;
  currentFunction: string = 'showCountry';
  totalDataCount: any;
  tableData: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.showCountry(0, this.apiFetchRecordLimit);
    this.button = 'ADD';
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  getSearchText(event: any) {
   // console.log(event);

    this.filterText = event;
  }

  onpageChnage() {
    this.showCountry(0, this.apiFetchRecordLimit);
  }

  addCountry() {
    if (this.button == 'ADD') {
      if (this.countrygroup.valid) {
        let updateData = {
          data: {
            name: this.countrygroup.value.name,
            created_At: moment().toISOString(),
          },
        };

        this.ApiParameter.savedata('country', updateData).subscribe(
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
    } else if (this.button == 'Update') {
      if (this.countrygroup.valid) {
        let updateData = {
          data: {
            name: this.countrygroup.value.name,
            created_At: moment().toISOString(),
          },
          whereConditions: { id: this.countrygroup.value.id },
        };
        this.ApiParameter.updatedata('country', updateData).subscribe(
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

  showCountry(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM country
      ORDER BY name ASC
      LIMIT ${limit} OFFSET ${start}`;
    console.log(quary);

    if (loadSpecificData) {
      quary = `SELECT *, COUNT(*) OVER () AS total_count
      FROM country
      WHERE name = '${search_text}'
         OR phonecode = '${search_text}'
         ORDER BY name ASC
       `;
    }

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
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  update(id: any) {
    this.ApiParameter.fetchdata('country', {
      projection: ['*'],
      whereConditions: { id: id },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.countrygroup.patchValue(res['data'][0]);
        this.button = 'Update';
        console.log(this.countrygroup);
      }
    });
  }

  delete(id: any, name: any) {
    console.log(id);

    this.blockUI.start('Deleting...');
    this.ApiParameter.deletedata('country', {
      whereConditions: { id: id },
    }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        this.ApiParameter.deletedata('state', {
          whereConditions: { country_name: name },
        }).subscribe((res: any) => {
          if (res.success) {
            this.ApiParameter.deletedata('city', {
              whereConditions: { country_name: name },
            }).subscribe((res: any) => {
              if (res.success) {
                Swal.fire('Success', res.message, 'success').then(() => {
                  this.ngOnInit();
                });
              }
            });
          }
        });
      } else {
        Swal.fire('Error', res.message, 'error');
      }
    });
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
            'country',
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
            'country',
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
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
  deletedata() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            data: {
              deleted: 0,
            },
            type: 'Delete',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'country',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'deleted',
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
