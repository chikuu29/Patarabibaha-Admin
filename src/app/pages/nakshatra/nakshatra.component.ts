import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';
@Component({
  selector: 'app-nakshatra',
  templateUrl: './nakshatra.component.html',
  styleUrls: ['./nakshatra.component.scss'],
})
export class NakshatraComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  zodiacs: any;
  zodiacsalldata: any;
  filterText: any;
  collectionSize: number = 0;
  page: number = 1;
  country: any;
  countryalldata: any;
  count: number = 0;
  tableSize: number = 10;
  options = [10, 15, 50, 100, 500, 1000];
  button: any = 'ADD';
  totalCount: number = 0;
  totalFetchrecord: number = 0;
  offset = 1;
  allId: any[] = [];
  pegination_required: any;
  apiFetchRecordLimit: any = 10;
  currentFunction: string = 'nakhetre';
  totalDataCount: any;
  tableData: any;
  countryOption: any[] = [];
  nakshatra: any;
  nakshatrasearch: any;
  constructor(
    private api: ApiService,
    private ApiParameter: ApiParameterScript
  ) {}

  ngOnInit(): void {
    this.nakhetre(0, this.apiFetchRecordLimit);
  }

  getSearchText(event: any) {
    console.log(event);

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
  nakhetre(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM nakshatra
      ORDER BY nakshatra_name ASC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT *,
      COUNT(*) OVER () AS total_count
      FROM nakshatra
      ORDER BY nakshatra_name ASC
      WHERE nakshatra_name = '${search_text}'
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
  changepaginetdata(event: any) {
    this.page = 1;
    this.offset = 1;
    this.pegination_required = true;
    this.apiFetchRecordLimit = Number(event.target.value);
    let _this: any = this;
    _this[this.currentFunction](0, Number(event.target.value));
  }

  showFilterData() {
    let param = {
      nakhetra: this.nakshatrasearch,
      status: 24,
    };

    this.api.nakshatra(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.nakshatra = res.message;
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
  edit(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  }
}
