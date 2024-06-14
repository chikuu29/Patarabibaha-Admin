import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-likedetails',
  templateUrl: './likedetails.component.html',
  styleUrls: ['./likedetails.component.scss'],
})
export class LikedetailsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button: any = 'ADD';
  likedetalis = new FormGroup({
    id: new FormControl('', []),
    Like_name: new FormControl('', [Validators.required]),
  });
  filterText: any;
  gotraalldata: any;
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
  currentFunction: string = 'getlikeData';
  totalDataCount: number = 0;
  editedcast: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    this.likedetalis = new FormGroup({
      id: new FormControl('', []),
      Like_name: new FormControl(''),
    });
    this.getlikeData(0, this.apiFetchRecordLimit);
  }
  addlike() {
    if (this.likedetalis.valid) {

      if (this.likedetalis.value.id == '') {
        let updateData = {
          data: {
            Like_name: this.likedetalis.value.Like_name,
            created_At: moment().toISOString(),
          },
        };
        this.ApiParameter.savedata('like_detalis', updateData).subscribe(
          (res: any) => {
            
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                this.likedetalis.value.Like_name = '';
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
      }else{
        let updateData = {
          data: {
            Like_name: this.likedetalis.value.Like_name,
            created_At: moment().toISOString(),
          },
          whereConditions: { id: this.likedetalis.value.id },
        };
        this.ApiParameter.updatedata('like_detalis', updateData).subscribe(
          (res: any) => {
            
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: res.message,
              }).then((ress: any) => {
                let update1 = {
                  "oldcast": this.editedcast,
                  "newdata" : this.likedetalis.value.Like_name,
                  "tablename" : "user_diet_hobbies",
                  "coulemnname" : "user_like"
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
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Your Like',
      });
    }
  }
  getlikeData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *, COUNT(*) OVER () AS total_count
        FROM like_detalis
        ORDER BY Like_name ASC
        LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
       FROM like_detalis
          WHERE sub_cast LIKE '%${search_text}%'
          ORDER BY Like_name ASC;
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
  getSearchText(event: any) {
    

    this.filterText = event;
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
            'like_detalis',
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
            'like_detalis',
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
            'like_detalis',
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
  update(data: any) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
    this.ApiParameter.fetchdata('like_detalis', {
      projection: ['*'],
      whereConditions: { id: data },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        // this.countryalldata = res['data'];
        this.likedetalis.patchValue(res['data'][0]);
        this.button = 'UPDATE';
        this.editedcast = res['data'][0].Like_name;
        
      }
    });
  }
}
