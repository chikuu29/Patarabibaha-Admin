import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************

  citygroup = new FormGroup({
    id: new FormControl('', []),
    country_name: new FormControl('', [Validators.required]),
    state_name: new FormControl('', [Validators.required]),
    city_name: new FormControl('', [Validators.required])
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
  currentFunction: string = 'getcitydata';
  totalDataCount: any;
  tableData: any;
  countryOption: any[] = [];
  stateOption: any;
  statealldatabycountry: any;
  allcitydata: any;
  editedcast: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript,
    private ApiParameterScript: ApiParameterScript,
    private CommonService : CommonService
  ) { }

  ngOnInit(): void {

    this.citygroup = new FormGroup({
      id: new FormControl('',),
      country_name: new FormControl(''),
      state_name: new FormControl(''),
      city_name: new FormControl('')
    });

    this.button = 'ADD';
    // this.ApiParameter.fetchdata('country', { "projection": ["*"] }).subscribe((res: any) => {
    //   if (res.success && res['data'].length > 0) {

    //     this.countryOption = res['data'].map((obj: any) => {
    //       if (obj.status == 1) {
    //         return { name: obj.name };
    //       } else {
    //         return null
    //       }
    //     });
    //     console.log(this.countryOption);
    //   }
    // });
    this.getcountryname();
    this.fatchdata();
    this.getcitydata(0, this.apiFetchRecordLimit);


  }

  getcitydata(start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any){
    this.pegination_required = true;
    var quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM city
      ORDER BY country_name ASC, state_name ASC , city_name ASC
      LIMIT ${limit} OFFSET ${start}`;


    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM city
      ORDER BY country_name ASC, state_name ASC , city_name ASC
      WHERE name = '${search_text}'
         OR country_name = '${search_text}'
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
  }



  getSearchText(event:any){
    console.log(event);

    this.filterText = event
  }

  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit,
      this.apiFetchRecordLimit
    );
    this.offset =
      this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit;
    // this.showCountry(0, this.apiFetchRecordLimit);
  }

  getstatefilter(country_name: any) {
    console.log(country_name);
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { "country_name": country_name, "status": 1 } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {

        this.stateOption = res['data'].map((obj: any) => {

          return { name: obj.name };

        });
        console.log(this.countryOption);

      } else {
        this.stateOption = []
      }

    });

  }

  getcountryname() {

    this.ApiParameter.fetchdata('country', { "projection": ["*"] }, 0,250).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.countryalldata = res['data'];
        console.log(this.countryalldata);
      }
    })
  }
  getstate() {
    this.ApiParameter.fetchdata('state', { "projection": ["*"], "whereConditions": { country_name: this.citygroup.value.country_name } }).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.statealldatabycountry = res['data'];
        console.log(this.statealldatabycountry);

      }


    })
  }

  adddata() {
    if (this.button == 'ADD') {

      if (this.citygroup.valid) {


        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "city_name": this.citygroup.value.city_name,
            "created_At": moment().toISOString()
          },
        }

        this.ApiParameter.savedata('city', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          }
        })


      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data'
        })
      }
    } else if (this.button == 'Update') {
      if (this.citygroup.valid) {
        let updateData = {
          "data": {
            "country_name": this.citygroup.value.country_name,
            "state_name": this.citygroup.value.state_name,
            "city_name": this.citygroup.value.city_name,
          },
          "whereConditions": { id: this.citygroup.value.id }
        }
        this.ApiParameter.updatedata('city', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              let update = {
                "oldcast": this.editedcast,
                "newdata" : this.citygroup.value.city_name,
                "tablename" : "user_religion",
                "coulemnname" : "user_city"
              }
              this.CommonService.coloumUpdated(update).subscribe((res:any)=>{});
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: res.message
            });
          }
        })


      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter All Your Data'
        })
      }
    }
  }
  fatchdata() {
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('city', { "projection": ["*"] },offset, 10).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
      if (res.success && res['data'].length > 0) {
        this.allcitydata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })
  }




  edit(id: any) {
    this.ApiParameter.fetchdata('city', { "projection": ["*"], "whereConditions": { id: id } }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.getstatefilter(res['data'][0]['country_name'])
        this.citygroup.patchValue(res['data'][0]);
        this.button = "Update";
        this.editedcast = this.citygroup.value.city_name;
        // console.log(this.city);

      }
    });
  }

  delete(id: any) {
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('city', { "whereConditions": { id: id } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
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
            'city',
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
            'city',
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
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }
}
