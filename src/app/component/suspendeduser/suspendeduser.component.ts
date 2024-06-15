import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPaymentProcessingTaskComponent } from 'src/app/shared/member-payment-processing-task/member-payment-processing-task.component';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-suspendeduser',
  templateUrl: './suspendeduser.component.html',
  styleUrls: ['./suspendeduser.component.scss']
})
export class SuspendeduserComponent implements OnInit {

  finaldata: any;
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
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
  currentFunction: string = 'getExpireData';

  kpiTileConfig: any[] = [
    {
      text: 'Female',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'getDeletdFemale',
      selectedStatus: false,
    },
    {
      text: 'Male',
      iconClass: 'fa-solid fa-wifi text-success',
      methodName: 'getDeletdMale',
      selectedStatus: false,
    },
  ];
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    
    this.allId = [];
    let _this: any = this;
    _this[this.currentFunction](0, this.collectionSize);
    let check = document.querySelectorAll('.check');
    check.forEach((checkbox: any, key: any) => {
      checkbox.checked = false;
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

  loadKpi(functionName: string, kpiNum: number) {
    this.kpiTileConfig.forEach((e: any, index: number) => {
      if (kpiNum != index) {
        e.selectedStatus = false;
      }
    });
    this.kpiTileConfig[kpiNum]['selectedStatus'] = true;

    this.currentFunction = functionName;
    this.page = 1;
    this.collectionSize = 10;
    this.pegination_required = true;
    let _this: any = this;
    _this[functionName](0, this.apiFetchRecordLimit);
  }

  getExpireData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    let Quary = `select * , COUNT(*) OVER () AS total_count
    from auth_user as a
    Join user_info as b on a.auth_ID = b.user_id
    where b.deleted = 0
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      Quary = `select * , COUNT(*) OVER () AS total_count
      from auth_user as a
      Join user_info as b on a.auth_ID = b.user_id
      WHERE b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR b.user_fname = '${search_text}'
      OR b.user_lname = '${search_text}'
      OR a.auth_phone_no like '%${search_text}%'
      AND b.deleted = 1
      `;
    }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.finaldata = res['data'];

      }
    });
  }
  getDeletdFemale(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ){
    this.currentFunction = 'getDeletdFemale';
    let Quary = `select * , COUNT(*) OVER () AS total_count
    from auth_user as a
    Join user_info as b on a.auth_ID = b.user_id
    where b.deleted = 0 AND b.user_gender = 'Female'
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      Quary = `select * , COUNT(*) OVER () AS total_count
      from auth_user as a
      Join user_info as b on a.auth_ID = b.user_id
      WHERE b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR b.user_fname = '${search_text}'
      OR b.user_lname = '${search_text}'
      OR a.auth_phone_no like '%${search_text}%'
      AND b.deleted = 1
      AND b.user_gender = 'Female'
      `;
    }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.finaldata = res['data'];

      }
    });
  }
  getDeletdMale(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ){
    this.currentFunction = 'getDeletdMale';
    let Quary = `select * , COUNT(*) OVER () AS total_count
    from auth_user as a
    Join user_info as b on a.auth_ID = b.user_id
    where b.deleted = 0 AND b.user_gender = 'Male'
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      Quary = `select * , COUNT(*) OVER () AS total_count
      from auth_user as a
      Join user_info as b on a.auth_ID = b.user_id
      WHERE b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR b.user_fname = '${search_text}'
      OR b.user_lname = '${search_text}'
      OR a.auth_phone_no like '%${search_text}%'
      AND b.deleted = 1
      AND b.user_gender = 'Male'
      `;
    }
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        this.finaldata = res['data'];

      }
    });

  }


  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  recoverdata() {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Recover',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            data: {
              deleted: 1,
            },
            type: 'Recover',
            whereConditions: this.allId,
          };
          this.ApiParameter.makeActinForMultipulData(
            'user_info',
            updateData
          ).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: 'Recover',
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
  checkAll(e: any) {
    let check = document.querySelectorAll('.check');


    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any, key: any) => {


        this.allId.push(parseInt(this.finaldata[key].Id));
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
  sendMail() {
    if (this.allId.length == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Select one user',
      });
    } else {
      let param = {
        mailIds: this.allId,
        filepath: environment.filePath,
      };


      this.CommonService.expiredMail(param).subscribe((res: any) => {});
      Swal.fire({
        icon: 'success',
        text: 'Mail send',
      }).then(() => {
        this.ngOnInit();
      });
    }
  }
  pernetdelete(data:any){
    this.CommonService.deleteRequest({ id: data }).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

}
