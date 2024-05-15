import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CommonService } from 'src/app/services/common.service';
import { jsPDF } from 'jspdf';
import * as _ from 'lodash';
import { AgePipe } from 'src/app/customPipe/age.pipe';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-matchpage',
  templateUrl: './matchpage.component.html',
  styleUrls: ['./matchpage.component.scss'],
})
export class MatchpageComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: any;
  class1: any = 'flex-item activedata';
  class2: any = 'flex-item';
  class3: any = 'flex-item';
  class4: any = 'flex-item';
  filterText: any;
  finaldata: any;
  allId: any[] = [];
  logo: any;
  totalDataCount: number = 0;
  totalFetchrecord: number = 0;
  alldata: any;
  tableData: any = [];
  apiFetchRecordLimit = 10;
  options = [10, 15, 50, 100, 500, 1000];
  page: any = 1;
  collectionSize: any = 10;
  offset = 1;
  pegination_required: boolean = false;
  currentFunction: string = 'getAllData';
  kpiTileConfig: any[] = [
    {
      text: 'All Data',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'getAllData',
      selectedStatus: false,
      class: '#AA9711',
    },
    {
      text: 'Recommended Matches Cast',
      iconClass: 'fa-solid fa-users text-primary',
      methodName: 'byCastmatchesforindivisual',
      selectedStatus: false,
      class: '#FF9700',
    },
    {
      text: 'Premium Matches Cast',
      iconClass: 'fa-solid fa-wifi text-success',
      methodName: 'byCastpremimusMatches',
      selectedStatus: false,
      class: '#009788',
    },
    {
      text: 'Recommended Matches Other Cast',
      iconClass: 'fa-solid fa-check-circle text-success',
      methodName: 'byOtherCastmatchesforindivisual',
      selectedStatus: false,
      class: '#FF1A0A',
    },
    {
      text: 'Premium Matches Other Cast',
      iconClass: 'fa-solid fa-times-circle text-danger',
      methodName: 'byOtherCastpremimusMatches',
      selectedStatus: false,
      class: '#0E47A1',
    },

  ];
  constructor(
    private activatedroute: ActivatedRoute,
    private commonservice: CommonService,
    private AgePipe: AgePipe,
    private router: Router,
    private ApiParameter: ApiParameterScript,
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res: any) => {
      let encryptSecretKey = 'Lipun';
      let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.user_id = data;
      this.loadKpi('getAllData', 0);
    });
    this.icone();
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

  getAllData(
    start: number,
    limit: number,
    loadSpecificData: boolean = false,
    search_text?: any
  ) {
    this.pegination_required = true;
    var quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      ORDER BY a.user_creation_date_time DESC
      LIMIT ${limit} OFFSET ${start}`;

    if (loadSpecificData) {
      quary = `SELECT a.*, b.*, COUNT(*) OVER () AS total_count
      FROM user_info AS a
      LEFT JOIN auth_user AS b ON a.user_id = b.auth_ID
      WHERE a.user_id = '${search_text}'
         OR b.auth_ID = '${search_text}'
         OR a.user_fname = '${search_text}'
         OR a.user_lname = '${search_text}'
         ORDER BY a.user_creation_date_time DESC
       `;
    }

    // console.log("query",quary);

    this.blockUI.start('Loading...');

    this.ApiParameter.fetchDataFormQuery(quary).subscribe((res: any) => {
      this.blockUI.stop();

      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.tableData = res['data'];
      } else {
        this.collectionSize = 1;
        this.tableData = [];
      }
    });
  }

  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  byCastmatchesforindivisual() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.byCastmatchesforindivisual(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.tableData = res['data'];
      }else{
        this.tableData = []
      }
    });
  }
  byCastpremimusMatches() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.byCastpremimusMatches(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.tableData = res['data'];
      }else{
        this.tableData = [];
      }
    });
  }
  byOtherCastmatchesforindivisual() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.byOtherCastmatchesforindivisual(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.tableData = res['data'];
      }else{
        this.tableData = []
      }
    });
  }
  byOtherCastpremimusMatches() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.byOtherCastpremimusMatches(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.tableData = res['data'];
        console.log(this.finaldata);
      }else{
        this.tableData = [];
      }
    });
  }

  calculateAge(birthday: Date): number {
    birthday = new Date(birthday);
    const ageDifMs: number = Date.now() - birthday.getTime();
    const ageDate: Date = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  icone() {
    this.ApiParameter.fetchdata('logo_table', { "projection": ["*"], "whereConditions": { status: 1} }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.logo = res['data'][0].image;
        console.log(this.logo);
      }
    });
  }

  public generatePDF() {
    var head = [['ID', 'NAME', 'DESIGNATION', 'DEPARTMENT']];

    var data2 = [
      [1, 'ROBERT', 'SOFTWARE DEVELOPER', 'ENGINEERING'],
      [2, 'CRISTINAO', 'QA', 'TESTING'],
      [3, 'KROOS', 'MANAGER', 'MANAGEMENT'],
      [4, 'XYZ', 'DEVELOPER', 'DEVLOPEMENT'],
      [5, 'ABC', 'CONSULTANT', 'HR'],
      [73, 'QWE', 'VICE PRESIDENT', 'MANAGEMENT'],
    ];

    this.blockUI.start('Generating PDF...');
    var pdfData = _.cloneDeep(this.finaldata);
    console.log('Click generatePDF', this.finaldata);

    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4', // or 'letter', 'a3', etc.
    });

    // const pdf = new jsPDF();
    const imageurl = environment.baseApiURL+'storage/logo_image/'+this.logo;
    console.log(imageurl);

    pdf.addImage(
      "https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png" ,
      'JPEG',
      65,
      5,
      0,
      0
    ); // adjust coordinates and dimensions accordingly
    // Sample data with text and image URLs
    _.map(
      pdfData,
      (res: any) =>
      (res.user_profile_image =
        environment.baseApiURL + 'storage/' +
        res.user_profile_image)
    );
    console.log('Click generatePDF', pdfData);

    const data = pdfData;
    console.log('data', data);
    const keyMap = ['user_dob', 'user_height', 'HomeTown'];
    let yPos = 30;
    let currentPage = 1;
    data.forEach((record: any) => {
      console.log(record);
      console.log('pdf', pdf.internal.pageSize.getHeight());

      pdf.addImage(record.user_profile_image, 'JPEG', 10, yPos, 50, 50);
      pdf.textWithLink('ID   :' + record.user_id, 70, (yPos += 10), {
        url: environment.application_url + 'member-profile/' + record.user_id,
      });

      // pdf.text(`Name: ${record.user_fname}` + ' ' + `${record.user_lname}`, 70, yPos+=10);
      // pdf.text(`Age: ${this.AgePipe.transform(record.user_dob)}`, 70, yPos+=10);
      pdf.text(`Gender: ${record.user_gender}`, 70, (yPos += 10));
      pdf.text(
        `Marital Status: ${record.user_marital_status ? record.user_marital_status : 'NA'
        }`,
        70,
        (yPos += 10)
      );
      pdf.text(
        `HomeTown:  ${record.user_city ? record.user_city : 'NA'},${record.user_city ? record.user_state : 'NA'
        }`,
        70,
        (yPos += 10)
      );
      // pdf.text(`City: ${record.city ? record.city : "NA"}`, 70, yPos+=10);

      // Draw lines to separate records
      pdf.line(0, 85, 210, 85);
      console.log('[record]', [record]);
      pdf.text('BIODATA', 85, yPos + 35);
      pdf.text(`AGE: ${this.calculateAge(record.user_dob)}`, 10, yPos += 50);
      pdf.text(
        `Height: ${record.user_height ? record.user_height : 'NA'}`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Colour: ${record.user_complextion ? record.user_complextion : 'NA'}`,
        10,
        (yPos += 10)
      );

      pdf.text('EDUCATION & OCCUPATION', 70, yPos + 20);
      // pdf.table(0,60,[],record,{ autoSize: true });
      // Move the Y position for the next record
      pdf.text(`Education: ${record.user_highest_education}`, 10, (yPos += 50));
      pdf.text(
        `Occupation: ${record.user_occupation ? record.user_occupation : 'NA'}`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Designation: ${record.user_occupation_details ? record.user_occupation_details : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Anulal Income:  ${record.user_anual_income ? record.user_anual_income : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Job Location:  ${record.user_occupation_location
          ? record.user_occupation_location
          : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Details Of Job:  ${record.user_occupation_details ? record.user_occupation_details : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Rashi:  ${record.user_zodiacs ? record.user_zodiacs : 'NA'}`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Nakhyatra:  ${record.user_nakhyatra ? record.user_nakhyatra : 'NA'}`,
        10,
        (yPos += 10)
      );
      yPos = 30;

      // if (yPos + 60 > pdf.internal.pageSize.getHeight()) {
      pdf.addPage();
      pdf.addImage(
        "https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png",
        'JPEG',
        65,
        5,
        0,
        0
      ); // adjust coordinates and dimensions accordingly
      // Sample data with text and image URLs
      currentPage++;
      // yPos = 30; // Reset Y position for the new page
      // }
    });

    const pdfFileName =
      'matching_report_' + `${this.user_id}_` + moment().toString() + '.pdf';
    pdf.save(pdfFileName, { returnPromise: true }).then((res: any) => {
      // console.log(res);
      this.blockUI.stop();
    });
  }

  sendMatches() {
    if (this.allId.length == 0) {
      Swal.fire({
        icon: 'question',
        text: 'Select one user',
      });
    } else {
      let param = {
        ids: this.allId,
        sendid: this.user_id,
      };
      console.log(param);

      this.commonservice.sendData(param).subscribe((res: any) => {
        if (res.code == 200) {
          Swal.fire({
            icon: 'success',
            text: 'Mail send'
          });
        }
      });
    }
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
  fillter(event: any, start = 0) {
    //this.pegination_required = false;
    //this.currentFunction = 'fillter';
    console.log('click fillter', event);
    var query = `SELECT * , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID WHERE  ORDER BY user_info.user_creation_date_time DESC`;
    if (event.isqueryGenerated) {
      query = `SELECT *,user_info.user_id AS auth_ID , COUNT(*) OVER () AS total_count
    FROM user_info
    LEFT JOIN user_religion ON user_info.user_id = user_religion.user_ID
    LEFT JOIN user_locations ON user_info.user_id = user_locations.user_ID
    LEFT JOIN user_family ON user_info.user_id = user_family.user_ID
    LEFT JOIN user_horoscope ON user_info.user_id = user_horoscope.user_id
    LEFT JOIN user_physical_details ON user_info.user_id = user_physical_details.user_ID
    LEFT JOIN user_about ON user_info.user_id = user_about.user_ID
    LEFT JOIN user_diet_hobbies ON user_info.user_id = user_diet_hobbies.user_ID
    LEFT JOIN user_education_occupations ON user_info.user_id = user_education_occupations.user_ID
    ${event.whereConditions}  ORDER BY user_info.user_creation_date_time DESC`;
    }

    console.log(query);

    this.ApiParameter.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.totalDataCount = res['data'][0].total_count;
        this.totalFetchrecord = start + res['data'].length;
        this.collectionSize =
          Math.ceil(res['data'][0].total_count / this.apiFetchRecordLimit) * 10;
        console.log(this.collectionSize);
        this.tableData = res['data'];
        this.currentFunction = 'fillter';
      } else {
        this.collectionSize = 1;
        this.tableData = [];
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
}
