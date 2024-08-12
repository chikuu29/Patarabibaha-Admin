import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-subcaste',
  templateUrl: './subcaste.component.html',
  styleUrls: ['./subcaste.component.scss'],
})
export class SubcasteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  subcastgroup = new FormGroup({
    id: new FormControl(''),
    sub_cast_name: new FormControl('', [Validators.required]),
    cast_name: new FormControl('', [Validators.required]),
  });
  button: any = 'Submit';
  filterText: any;
  collectionSize: number = 0;
  page: number = 1;
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  tabledata: any;
  action: any = 'Submit';
  rdata: any;
  originaldata: any;
  searchincome: any;
  allannualincome: any;
  alldata: any;
  tableData: any = [];
  allId: any[] = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getsubcast';
  totalDataCount: number = 0;
  editedcast: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private CommonService : CommonService
  ) {}
  castOption: any;
  subcast: any;
  ngOnInit(): void {
    this.allId = [];
    this.subcastgroup = new FormGroup({
      id: new FormControl(''),
      sub_cast_name: new FormControl(''),
      cast_name: new FormControl('0'),
    });
    this.getcast();
    this.getsubcast(0, this.apiFetchRecordLimit);
    this.button = 'Submit';
  }

  getSearchText(event: any) {


    this.filterText = event;
  }
  getcast() {
    this.ApiParameter.fetchdata('cast_table', { projection: ['*'],whereConditions:{status:1} }).subscribe(
      (res: any) => {
        if (res.success) {
          // this.cast = res['data'];


          this.castOption = res['data'].map((obj: any) => {
            if (obj.status == 1) {
              return { name: obj.cast_name };
            } else {
              return null;
            }
          });
        }
      }
    );
  }
  getsubcast(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM sub_cast
        ORDER BY cast_name ASC , sub_cast_name ASC
        LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
       FROM sub_cast
          WHERE sub_cast_name LIKE '%${search_text}%'
          ORDER BY cast_name ASC , sub_cast_name ASC;
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

  adddata() {
    if (this.button == 'Submit') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a cast name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  sub cast name',
        });
      } else {
        let updateData = {
          data: {
            cast_name: this.subcastgroup.value.cast_name,
            sub_cast_name: this.subcastgroup.value.sub_cast_name,
            created_At: moment().toISOString(),
          },
        };

        this.ApiParameter.savedata('sub_cast', updateData).subscribe(
          (res: any) => {

            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'success',
                text: res.message,
              });
            }
          }
        );
      }
    } else if (this.button == 'Update') {
      if (this.subcastgroup.value.cast_name == '0') {
        Swal.fire({
          icon: 'error',
          text: 'Select a Country name',
        });
      } else if (this.subcastgroup.value.sub_cast_name == '') {
        Swal.fire({
          icon: 'error',
          text: 'Enter  state name',
        });
      } else {
        let updateData = {
          data: {
            cast_name: this.subcastgroup.value.cast_name,
            sub_cast_name: this.subcastgroup.value.sub_cast_name,
          },
          whereConditions: { id: this.subcastgroup.value.id },
        };

        this.ApiParameter.updatedata('sub_cast', updateData).subscribe(
          (res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                let update1 = {
                  "oldcast": this.editedcast,
                  "newdata" : this.subcastgroup.value.sub_cast_name,
                  "tablename" : "user_religion",
                  "coulemnname" : "user_subcaste"
                }
                this.CommonService.coloumUpdated(update1).subscribe((res:any)=>{});
                this.ngOnInit();
              });
            } else {
              Swal.fire({
                icon: 'success',
                text: res.message,
              });
            }
          }
        );
      }
    }
  }

  edit(id: any) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
    this.ApiParameter.fetchdata('sub_cast', {
      projection: ['*'],
      whereConditions: { id: id },
    }).subscribe((res: any) => {


      if (res.success && res['data'].length > 0) {
        this.subcastgroup.patchValue(res['data'][0]);
        this.button = 'Update';
        this.editedcast = res['data'][0].sub_cast_name;

      }
    });
  }

  deleted(data: any) {
    this.blockUI.start('Deleting...');
    this.ApiParameter.deletedata('sub_cast', {
      whereConditions: { id: data },
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
  publish(id: any, status: any) {
    if (status == 1) {
      let updateData = {
        data: {
          status: 0,
        },
        whereConditions: { id: id },
      };
      this.ApiParameter.updatedata('sub_cast', updateData).subscribe(
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
    } else if (status == 0) {
      let updateData = {
        data: {
          status: 1,
        },
        whereConditions: { id: id },
      };
      this.ApiParameter.updatedata('sub_cast', updateData).subscribe(
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

        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 1,
            },
            type: 'Publish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'sub_cast',
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

        if (r.isConfirmed) {
          let updateData = {
            data: {
              status: 0,
            },
            type: 'UnPublish',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'sub_cast',
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
  deletedata() {
    if (this.allId.length == 0) {
      Swal.fire('Warning', 'Please select any record', 'warning');
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {

        if (r.isConfirmed) {
          let updateData = {
            deleted: 'Delete',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipuldeleteData(
            'sub_cast',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Deleted',
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
  search(search_text: any) {
    //alert(this.currentFunction)
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
  checkAll(e: any) {


    let check = document.querySelectorAll('.check');


    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {
        this.allId.push(parseInt(this.tableData[key].id));
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
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
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
}
