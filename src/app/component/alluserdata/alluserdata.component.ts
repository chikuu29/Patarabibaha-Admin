
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alluserdata',
  templateUrl: './alluserdata.component.html',
  styleUrls: ['./alluserdata.component.scss']
})
export class AlluserdataComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  alldata: any;
  finaldata: any = [];
  filterText: string;

  allId: any[] = [];


  class1: any = 'btn active';
  class2: any = 'btn btn-primary';
  class3: any = 'btn btn-primary';
  class4: any = 'btn btn-primary';
  class5: any = 'btn btn-primary';
  class6: any = 'btn btn-primary';
  class7: any = 'btn btn-primary';
  class8: any = 'btn btn-warning';
  class9: any = 'btn btn-primary';
  page: any = 1;
  collectionSize: any = 10
  pegination_required: boolean = false
  currentFunction:string = 'getAllData';

  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }
  date: any;
  ngOnInit(): void {
    let all = <any>document.getElementById('all');
    all.checked = false;
    this.allId = [];
    this.page = 1;
    this.collectionSize = 10
    this.getAllData(0, 10);
    this.date = new Date();
  }

  loadDATA(functionName: string) {
    this.currentFunction = functionName;
    this.page = 1;
    this.collectionSize = 10
    this.pegination_required = true
    let _this: any = this
    _this[functionName](0, 10);
  }
  getSearchText(event: any) {
    this.filterText = event
  }
  search(search_text: any) {
    let _this:any = this;
    _this[this.currentFunction](0, 10,true,search_text);
    // console.log(search_text);
    // this.getAllData(0, 10, true, search_text)

  }
  onpageChnage() {
    let _this:any = this;
    _this[this.currentFunction](this.page * 10 - 10, 10);
    //this.getAllData(this.page * 10 - 10, 10)
  }

  

  deletedata() {
    if (this.allId.length == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
      Swal.fire({
        icon: 'question',
        text: 'Select one',
      });
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
    this.class1 = 'btn active';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn btn-primary';
    this.class8 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
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


    // console.log(quary);
    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success) {
        this.collectionSize = Math.round(res['data'][0].total_count)
        // this.collectionSize=
        console.log(this.collectionSize);

        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }


 


  getAllOnlineData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any) {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn active';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
   // let Quary = `select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where
   //  a.online_status=1`;
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
        this.collectionSize = Math.round(res['data'][0].total_count)
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllPublishedData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn active';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn btn-primary';
    this.class8 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllUnpublishedData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn active';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';

    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.status=0';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllDeletedData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn active';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.deleted=0';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllNotDeletedData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn active';
    this.class7 = 'btn btn-primary';
    this.class8 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.deleted=1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllApprovedData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = 'btn active';
    this.class8 = 'btn btn-primary';
    this.class9 = 'btn btn-primary';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Approved"';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllPendingData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = ' btn btn-primary';
    this.class8 = 'btn active';
    this.class9 = 'btn btn-primary';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Pending"';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }
  getAllvaliduserData() {
    this.class1 = 'btn btn-primary ';
    this.class2 = 'btn btn-primary';
    this.class3 = 'btn btn-primary';
    this.class4 = 'btn btn-primary';
    this.class5 = 'btn btn-primary';
    this.class6 = 'btn btn-primary';
    this.class7 = ' btn btn-primary';
    this.class8 = 'btn btn-primary';
    this.class9 = 'btn active';
    let Quary = 'select * from user_info as a left join auth_user as b on a.user_id = b.auth_ID where a.user_status="Approved" AND a.deleted=1 AND a.status=1';
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        console.log(this.finaldata);
      } else {
        this.finaldata = [];
      }
    });
  }

  checkAll(e: any) {
    let check = document.querySelectorAll('.check');
    this.allId = [];
    if (e.target.checked) {
      check.forEach((element: any, key: any) => {
        this.allId.push(parseInt(this.finaldata[key].Id));
        element.checked = true;
      });
    } else {
      check.forEach((element: any) => {
        this.allId = [];
        element.checked = false;
      });
    }
    console.log(this.allId);
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
    console.log(this.allId);
  }


}
