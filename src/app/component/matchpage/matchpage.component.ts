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
  constructor(
    private activatedroute: ActivatedRoute,
    private commonservice: CommonService,
    private AgePipe: AgePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res: any) => {
      let encryptSecretKey = 'Lipun';
      let bytes = CryptoJS.AES.decrypt(res.id, encryptSecretKey);
      let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.user_id = data;
    });
    this.matches();
  }
  userpage(data: any) {
    this.router.navigate(['/user', data]);
  }

  matchByCast() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.matchByCast(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data'];
      }
    });
  }
  premimusMatches() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.premimusMatches(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data'];
      }
    });
  }
  matchesforindivisual() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.matchesforindivisual(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data'];
      }
    });
  }
  matches() {
    let data = {
      user_id: this.user_id,
    };
    this.commonservice.matches(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data'];
        console.log(this.finaldata);
      }
    });
  }
  activeclass(data: any) {
    if (data == '1') {
      this.class1 = 'flex-item activedata';
      this.class2 = 'flex-item';
      this.class3 = 'flex-item';
      this.class4 = 'flex-item';
      this.matches();
    } else if (data == '2') {
      this.class1 = 'flex-item';
      this.class2 = 'flex-item activedata';
      this.class3 = 'flex-item';
      this.class4 = 'flex-item';
      this.matchByCast();
    } else if (data == '3') {
      this.class1 = 'flex-item';
      this.class2 = 'flex-item';
      this.class3 = 'flex-item activedata';
      this.class4 = 'flex-item';
      this.matchesforindivisual();
    } else if (data == '4') {
      this.class1 = 'flex-item';
      this.class2 = 'flex-item';
      this.class3 = 'flex-item';
      this.class4 = 'flex-item activedata';
      this.premimusMatches();
    }
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
    pdf.addImage(
      'https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png',
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
          'https://admin.choicemarriage.com/api/storage/' +
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
        url: 'https://choicemarriage.com/member-profile/' + record.user_id,
      });

      // pdf.text(`Name: ${record.user_fname}` + ' ' + `${record.user_lname}`, 70, yPos+=10);
      // pdf.text(`Age: ${this.AgePipe.transform(record.user_dob)}`, 70, yPos+=10);
      pdf.text(`Gender: ${record.user_gender}`, 70, (yPos += 10));
      pdf.text(
        `Marital Status: ${
          record.user_marital_status ? record.user_marital_status : 'NA'
        }`,
        70,
        (yPos += 10)
      );
      pdf.text(
        `HomeTown:  ${record.user_city ? record.user_city : 'NA'},${
          record.user_city ? record.user_state : 'NA'
        }`,
        70,
        (yPos += 10)
      );
      // pdf.text(`City: ${record.city ? record.city : "NA"}`, 70, yPos+=10);

      // Draw lines to separate records
      pdf.line(0, 85, 210, 85);
      console.log('[record]', [record]);
      pdf.text('BIODATA', 85, yPos + 35);
      pdf.text(`DOB: ${record.user_dob}`, 10, (yPos += 50));
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
        `Designation: ${
          record.user_occupation_details ? record.user_occupation_details : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Anulal Income:  ${
          record.user_anual_income ? record.user_anual_income : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Job Location:  ${
          record.user_occupation_location
            ? record.user_occupation_location
            : 'NA'
        }`,
        10,
        (yPos += 10)
      );
      pdf.text(
        `Details Of Job:  ${
          record.user_occupation_details ? record.user_occupation_details : 'NA'
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
        'https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png',
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

      this.commonservice.sendData(param).subscribe((res: any) => {});
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
}
