import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CommonService } from 'src/app/services/common.service';
import { jsPDF } from 'jspdf';
import * as _ from 'lodash';
import { AgePipe } from 'src/app/customPipe/age.pipe';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-matchpage',
  templateUrl: './matchpage.component.html',
  styleUrls: ['./matchpage.component.scss']
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
  constructor(
    private activatedroute: ActivatedRoute,
    private commonservice: CommonService,
    private AgePipe: AgePipe,
    private router :Router
  ) { }

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
      "user_id": this.user_id
    }
    this.commonservice.matchByCast(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data']
      }
    });
  }
  premimusMatches() {
    let data = {
      "user_id": this.user_id
    }
    this.commonservice.premimusMatches(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data']
      }
    });
  }
  matchesforindivisual() {
    let data = {
      "user_id": this.user_id
    }
    this.commonservice.matchesforindivisual(data).subscribe((res: any) => {
      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data']
      }
    });
  }
  matches() {
    let data = {
      "user_id": this.user_id
    }
    this.commonservice.matches(data).subscribe((res: any) => {

      if (res.status) {
        this.finaldata = {};
        this.finaldata = res['data']
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
      this.premimusMatches()
    }

  }


  public generatePDF() {
    
    this.blockUI.start("Generating PDF...")
    var pdfData =_.cloneDeep(this.finaldata)
    console.log("Click generatePDF", this.finaldata);
 
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4', // or 'letter', 'a3', etc.
    });

    // const pdf = new jsPDF();
    pdf.addImage("https://admin.choicemarriage.com/api/storage/logo_image/6521ccbea425d.png", 'JPEG', 65, 5, 0, 0); // adjust coordinates and dimensions accordingly
    // Sample data with text and image URLs
    _.map(pdfData, (res: any) => res.user_profile_image = "https://admin.choicemarriage.com/api/storage/" + res.user_profile_image)
    console.log("Click generatePDF", pdfData);

    const data = pdfData

    let yPos = 30;
    let currentPage = 1;
    data.forEach((record: any) => {
      console.log(record);
      console.log("pdf", pdf.internal.pageSize.getHeight());

      if (yPos + 60 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        currentPage++;
        yPos = 10; // Reset Y position for the new page
      }
      pdf.addImage(record.user_profile_image, 'JPEG', 10, yPos, 50, 50);
      pdf.text(`Name: ${record.user_fname}` + ' ' + `${record.user_lname}`, 70, yPos + 10);
      pdf.text(`Age: ${this.AgePipe.transform(record.user_dob)}`, 70, yPos + 25);
      // pdf.text(`Gender: ${record.user_gender}`, 70, yPos + 25);s

      pdf.text(`City: ${record.city ? record.city : "NA"}`, 70, yPos + 40);

      // Draw lines to separate records
      pdf.line(0, yPos + 60, 210, yPos + 60);

      // Move the Y position for the next record
      yPos += 70;
    });
   
    const pdfFileName='matching_report_' + `${this.user_id}_` + moment().toString() + '.pdf'
    pdf.save(pdfFileName,{returnPromise:true}).then((res:any)=>{
      // console.log(res);
      this.blockUI.stop()
      
    });

  }

}


