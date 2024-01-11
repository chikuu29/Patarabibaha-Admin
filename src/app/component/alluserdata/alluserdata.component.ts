import { Component, OnInit,AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-alluserdata',
  templateUrl: './alluserdata.component.html',
  styleUrls: ['./alluserdata.component.scss']
})
export class AlluserdataComponent implements OnInit {
  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  tableData: any = [];
  filterText: string;

  allId: any[] = [];

  apiFetchRecordLimit=10
  options = [10,15,50,100,500,1000];
  page: any = 1;
  collectionSize: any = 10
  offset=1;
  pegination_required: boolean = false
  currentFunction: string = 'getAllData';

  kpiTileConfig: any[] = [
    {
      text: 'All Data',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'getAllData',
      selectedStatus: false
    },
    {
      text: 'Online',
      iconClass: 'fa-solid fa-wifi text-success',
      methodName: 'getAllOnlineData',
      selectedStatus: false
    },
    {
      text: 'Published',
      iconClass: 'fa-solid fa-check-circle text-success',
      methodName: 'getAllPublishedData',
      selectedStatus: false
    },
    {
      text: 'Un Published',
      iconClass: 'fa-solid fa-times-circle text-danger',
      methodName: 'getAllUnpublishedData',
      selectedStatus: false
    },
    {
      text: 'Deleted',
      iconClass: 'fas fa-trash text-danger',
      methodName: 'getAllDeletedData',
      selectedStatus: false
    },
    {
      text: 'Not Deleted',
      iconClass: 'fas fa-ban text-danger',
      methodName: 'getAllNotDeletedData',
      selectedStatus: false
    },
    {
      text: 'Approve',
      iconClass: 'fas fa-thumbs-up text-primary',
      methodName: 'getAllApprovedData',
      selectedStatus: false
    },
    {
      text: 'Pending',
      iconClass: 'fas fa-clock text-warning',
      methodName: 'getAllPendingData',
      selectedStatus: false
    },
    {
      text: 'Valid user',
      iconClass: 'fas fa-user-check text-success',
      methodName: 'getAllvaliduserData',
      selectedStatus: false
    }
  ]


  totalDataCount: number = 0
  totalFetchrecord:number=0

  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }
  date: any;
  ngOnInit(): void {
    this.allId = [];
    this.page = 1;
    this.collectionSize = 10
    this.date = new Date();
    this.loadKpi("getAllData", 0)
  }

  changepaginetdata(event:any){
   this.page = 1;
   this.offset=1;
   this.pegination_required = true;
   this.apiFetchRecordLimit = Number(event.target.value);
   let _this: any = this
   _this[this.currentFunction](0, Number(event.target.value));
  }

  loadKpi(functionName: string, kpiNum: number) {
    this.kpiTileConfig.forEach((e: any, index: number) => {
      if (kpiNum != index) {
        e.selectedStatus = false
      }

    })
    this.kpiTileConfig[kpiNum]['selectedStatus'] = true

    this.currentFunction = functionName;
    this.page = 1;
    this.collectionSize = 10
    this.pegination_required = true
    let _this: any = this
    _this[functionName](0, this.apiFetchRecordLimit);
  }
  getSearchText(event: any) {
    this.filterText = event
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
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID`
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
    ${event.whereConditions}`
    }
    //console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        this.collectionSize = res['data'].length
        // this.collectionSize=
        // console.log(this.collectionSize);

        this.tableData = res['data'];
        // console.log(this.tableData);
      }

    })

  }
  onpageChnage() {
    let _this: any = this;
    _this[this.currentFunction](this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit, this.apiFetchRecordLimit);
    this.offset=this.page * this.apiFetchRecordLimit - this.apiFetchRecordLimit
  }



  deletedata() {
    if (this.allId.length == 0) {
      
      Swal.fire("Warning","Please select any record",'warning')
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Delete',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "deleted": 0,
            },
            'type': 'Delete',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "deleted"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }
  }

  recoverdata() {
    if (this.allId.length == 0) {
      Swal.fire("Warning","Please select any record",'warning')
    } else {


      Swal.fire({
        icon: 'question',
        text: 'Do you want to Recover',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "deleted": 1,
            },
            'type': 'Delete',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Recovered"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }
  }





  publishuser() {
    if (this.allId.length == 0) {
      Swal.fire("Warning","Please select any record",'warning')
    } else {

      Swal.fire({
        icon: 'question',
        text: 'Do you want to publish',
        showCancelButton: true,
      }).then((r: any) => {
        console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "status": 1,
            },
            'type': 'Publish',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "publish"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }

  }
  unpublishuser() {
    // alert(data);
    if (this.allId.length == 0) {
      Swal.fire("Warning","Please select any record",'warning')
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to  Unpublish',
        showCancelButton: true,
      }).then((r: any) => {
        //console.log(r);
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "status": 0,
            },
            'type': 'UnPublish',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Unpublish"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }

  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }
  makeonline() {
    if (this.allId.length == 0) {
      Swal.fire("Warning","Please select any record",'warning')
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want make this user online',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "online_status": 1,
            },
            'type': 'online',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "online"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }
  }
  makeoffline() {
    if (this.allId.length == 0) {
      Swal.fire("Warning","Please select any record",'warning')
    } else {
      Swal.fire({
        icon: 'question',
        text: 'Do you want make this user offline',
        showCancelButton: true,
      }).then((r: any) => {
        if (r.isConfirmed) {
          let updateData = {
            "data": {
              "online_status": 0,
            },
            'type': 'Offline',
            "whereConditions": this.allId
          }
          this.ApiParameter.makeActinForMultipulData('user_info', updateData).subscribe((res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                text: "Offline"
              }).then(() => {
                this.ngOnInit()
              });
            } else {
              Swal.fire({
                icon: 'warning',
                text: res.message
              });
            }
          })
        }
      });
    }
  }


  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    this.pegination_required = true
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      LIMIT ${limit} OFFSET ${start}`;
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
   
    //console.log("query",quary);
    
    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
     
      
      if (res.success && res['data'].length > 0) {
     
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.ceil(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
       console.log(this.collectionSize);
        this.tableData = res['data'];
     
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }





  getAllOnlineData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
          FROM user_info AS a
          LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
          a.online_status=1
          LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
            FROM user_info AS a
            LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
            WHERE
                a.online_status=1
                AND a.user_id = '${search_text}'
               OR b.auth_ID = '${search_text}'
               OR a.user_fname = '${search_text}'
               OR a.user_lname = '${search_text}';
             `;
    }








    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.tableData = [];
      }
    });
  }
  getAllUnpublishedData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
          FROM user_info AS a
          LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
          a.status=0
          LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
            FROM user_info AS a
            LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
            WHERE
                a.online_status=1
                AND a.user_id = '${search_text}'
               OR b.auth_ID = '${search_text}'
               OR a.user_fname = '${search_text}'
               OR a.user_lname = '${search_text}';
             `;
    }
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        // alert('ll')
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;
        
        this.tableData = res['data'];
        // console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
        // console.log(this.tableData);
      }
    });
  }
  getAllDeletedData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    // let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.deleted=0';
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.deleted=0
    LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
          a.online_status=1
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      //console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;;
        this.tableData = res['data'];
        //console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  getAllNotDeletedData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.deleted=1';
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.deleted=1
    LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
          a.online_status=1
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  getAllApprovedData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Approved"';
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_status="Approved"
    LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
          a.online_status=1
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  getAllPendingData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
   
    // let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Pending"';
    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_status="Pending"
    LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
          a.online_status=1
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  getAllvaliduserData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    
    //let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Approved" AND a.deleted=1 AND a.status=1';


    let quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
    FROM user_info AS a
    LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID where
    a.user_status="Approved" AND a.deleted=1 AND a.status=1
    LIMIT ${limit} OFFSET ${start}`
    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE
          a.online_status=1
          AND a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}';
       `;
    }
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount=res['data'][0].total_count;
        this.totalFetchrecord =start+res['data'].length
        this.collectionSize = Math.round(res['data'][0].total_count/this.apiFetchRecordLimit)*10;;
        this.tableData = res['data'];
        console.log(this.tableData);
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }
  

  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    console.log(check);
    
    this.allId = [];
    if (e.target.checked) {
      check.forEach((checkbox: any,key:any) => {
        console.log('p');
        
        this.allId.push(parseInt(this.tableData[key].Id));
        checkbox.checked = true;
      });
    } else {
      check.forEach((checkbox: any,key:any) => {
        this.allId = [];
        checkbox.checked = false;
      });
    }
    console.log(this.allId);
  }
  getId(id: any, e: any) {

    console.log("hii",e);
    
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

  viwePlan(data: any) {
    this.router.navigate(['/plan-Deatils', data])
  }


  openNewTab(user_id:any){
    window.open("/user/"+user_id, '_blank');
  }

}
