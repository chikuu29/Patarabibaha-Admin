import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss'],
})
export class OccupationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button: any = 'ADD';
  occupation = new FormGroup({
    id: new FormControl(''),
    occupation_name: new FormControl('', [Validators.required]),
  });
  tabledata: any;
  action: any = 'Submit';
  rdata: any;
  filterText: any;
  collectionSize: number = 0;
  page: number = 1;
  totalCount: number = 0;
  totalFetchrecord: number = 0;
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
  currentFunction: string = 'getAllData';
  totalDataCount: number = 0;
  editedcast: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    this.occupation = new FormGroup({
      id: new FormControl(''),
      occupation_name: new FormControl(''),
    });
    this.button = 'ADD';
    this.getAllData(0, this.apiFetchRecordLimit);
  }

  getSearchText(event: any) {
    

    this.filterText = event;
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
  public() {
    if (this.button == 'ADD') {
      if (this.occupation.valid) {
        let updateData = {
          data: {
            occupation_name: this.occupation.value.occupation_name,
            created_At: moment().toISOString(),
          },
        };

        this.ApiParameter.savedata('occupation', updateData).subscribe(
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
      } else if (this.button == 'Update') {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Occupation Name',
        });
      }
    } else {
      if (this.occupation.valid) {
        let updateData = {
          data: {
            occupation_name: this.occupation.value.occupation_name,
            //"created_At": moment().toISOString()
          },
          whereConditions: { id: this.occupation.value.id },
        };

        this.ApiParameter.updatedata('occupation', updateData).subscribe(
          (res: any) => {
            
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                let update = {
                  oldcast: this.editedcast,
                  newdata: this.occupation.value.occupation_name,
                  tablename: 'user_education_occupations',
                  coulemnname: 'user_occupation',
                };
                this.CommonService.coloumUpdated(update).subscribe(
                  (res: any) => {}
                );
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
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Occupation Name',
        });
      }
    }
  }
  getAllData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM occupation
        ORDER BY occupation_name ASC
        LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
       FROM occupation
          WHERE occupation_name LIKE '%${search_text}%'
           ORDER BY LOWER(occupation_name) ASC;
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

    // let offset = this.page * 10 - 10
    // this.ApiParameter.fetchdata('occupation', { "projection": ["*"]  },offset,10).subscribe((res: any) => {
    //   

    //   this.totalFetchrecord = offset+res['count']
    //   this.totalCount = res['totalCount']
    //   this.collectionSize = res['totalCount']
    //   if (res.success) {
    //     //this.privacypalicy.patchValue(res['data'][0])
    //     this.tabledata = res['data'];
    //     );

    //   }
    // })
  }
  update(data: any) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.ApiParameter.fetchdata('occupation', {
      projection: ['*'],
      whereConditions: { id: data },
    }).subscribe((res: any) => {
      
      this.button = 'Update';
      if (res.success) {
        this.occupation.patchValue(res['data'][0]);
        this.editedcast = res['data'][0].occupation_name;
      }
    });
  }
  deleted(data: any) {
    this.blockUI.start('Deleting...');
    this.ApiParameter.deletedata('occupation', {
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
      this.ApiParameter.updatedata('occupation', updateData).subscribe(
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
      this.ApiParameter.updatedata('occupation', updateData).subscribe(
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
            'occupation',
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
            'occupation',
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
            'mother_tongue',
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
}
