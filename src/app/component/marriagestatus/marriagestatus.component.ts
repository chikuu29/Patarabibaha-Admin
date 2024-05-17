import { Component, OnInit } from '@angular/core';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as CryptoJS from 'crypto-js';




@Component({
  selector: 'app-marriagestatus',
  templateUrl: './marriagestatus.component.html',
  styleUrls: ['./marriagestatus.component.scss']
})
export class MarriagestatusComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
  filterText: string;
  collectionSize: any = 10
  pegination_required: boolean = true
  finaldata: any;
  allId:any[] = [];
  page: any = 1;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    let all = <any>document.getElementById('all');
    all.checked = false;
    this.allId = [];
    this.page = 1;
    this.collectionSize = 10
    let _this:any = this;
    this.getAllData(this.page * 10 - 10, 10);
  }
  combine(data:any){
    this.router.navigate(['/marriage-combine', data]);
  }
  loadDATA(functionName: string) {
    //this.currentFunction = functionName;
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
    this.getAllData(0, 10,true,search_text);
  }
  onpageChnage() {
    let _this:any = this;
    this.getAllData(this.page * 10 - 10, 10);
  }

  getAllData(start: number, limit: number, loadSpecificData: boolean = false, search_text?: any){
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID AND a.marriage_status = 0
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



    // console.log(quary);
    this.blockUI.start('Loading...')
    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        this.collectionSize = Math.round(res['data'][0].total_count);
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }else{
        this.collectionSize = 1;
        this.finaldata = [];
      }
    });
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
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
