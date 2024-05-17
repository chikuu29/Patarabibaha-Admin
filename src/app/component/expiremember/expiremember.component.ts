import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPaymentProcessingTaskComponent } from 'src/app/shared/member-payment-processing-task/member-payment-processing-task.component';

@Component({
  selector: 'app-expiremember',
  templateUrl: './expiremember.component.html',
  styleUrls: ['./expiremember.component.scss'],
})
export class ExpirememberComponent implements OnInit {
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
      text: 'Expire Users',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'getExpireData',
      selectedStatus: false,
    },
    {
      text: 'Free Users',
      iconClass: 'fa-solid fa-wifi text-success',
      methodName: 'freeUser',
      selectedStatus: false,
    },
    {
      text: 'Premium Users',
      iconClass: 'fa-solid fa-check-circle text-success',
      methodName: 'premiumUser',
      selectedStatus: false,
    },
  ];
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    let _this: any = this;
    _this[this.currentFunction](0, this.collectionSize);
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
    let Quary = `select * , COUNT(*) OVER () AS total_count from auth_user as a
    Join user_info as b join user_plan_deatils as c on
        a.auth_ID = b.user_id
    AND b.user_id = c.user_id
    where c.active_status = 1 AND c.plan_ending_date < now()
    LIMIT ${limit} OFFSET ${start}
    `;
    if (loadSpecificData) {
      Quary = `select * , COUNT(*) OVER () AS total_count from auth_user as a
      Join user_info as b join user_plan_deatils as c on
          a.auth_ID = b.user_id
      AND b.user_id = c.user_id
      where c.active_status = 1 AND c.plan_ending_date < now()
      WHERE b.user_id = '${search_text}'
      OR a.auth_ID = '${search_text}'
      OR b.user_fname = '${search_text}'
      OR b.user_lname = '${search_text}'
      OR a.auth_phone_no like '%${search_text}%'
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

  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  deletedata(data: any, deleted: any) {
    if (deleted == 1) {
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
            whereConditions: { user_id: data },
          };
          this.ApiParameter.updatedata('user_info', updateData).subscribe(
            (res: any) => {
              // console.log(res);
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
            }
          );
        } else {
        }
      });
    } else if (deleted == 0) {
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
            whereConditions: { user_id: data },
          };
          this.ApiParameter.updatedata('user_info', updateData).subscribe(
            (res: any) => {
              // console.log(res);
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  text: 'Recoverad',
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
        } else {
        }
      });
    }
  }
  Upgrade(data: any) {
    const modalRef = this.modalService.open(
      MemberPaymentProcessingTaskComponent,
      { size: 'lg' }
    );
    modalRef.componentInstance.user_Data = data;
  }
  freeUser() {
    let Quary = 'select * from membership_plan where membership_plan_default=1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        let free = res['data'][0].membership_plan_type;
        //console.log(free);

        let Quary =
          'select * from auth_user as a Join user_info as b join user_plan_deatils as c on a.auth_ID = b.user_id AND b.user_id = c.user_id where c.active_status = 1 AND c.user_plan_type =' +
          `'${free}'` +
          ';';
        console.log(Quary);
        this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
          console.log(res);
          if (res.success && res['data'].length > 0) {
            this.finaldata = res['data'];
            console.log(this.finaldata);
          }
        });
      }
    });
  }
  premiumUser() {
    let Quary = 'select * from membership_plan where membership_plan_default=1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        let free = res['data'][0].membership_plan_type;
        //console.log(free);

        let Quary = `select * from auth_user as a Join user_info as b join user_plan_deatils as c on a.auth_ID = b.user_id AND b.user_id = c.user_id where c.active_status = 1 AND c.user_plan_type <>'${free}'
        ORDER BY b.user_creation_date_time DESC;`;
        console.log(Quary);
        this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
          console.log(res);
          if (res.success && res['data'].length > 0) {
            this.finaldata = res['data'];
            console.log(this.finaldata);
          }
        });
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

        this.allId.push(this.finaldata[key].user_email);
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
      this.allId.push(id);
    } else {
      let index = this.allId.indexOf(id);
      this.allId.splice(index, 1);
      let k = <any>document.getElementById('all');
      k.checked = false;
    }
    console.log(this.allId);
  }
  sendMail(){

  }
}
