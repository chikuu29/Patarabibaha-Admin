import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.scss'],
})
export class TicketviewComponent implements OnInit {
  dataoffeedback: any;
  status: any;
  resolutionDetails: any;
  details: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TicketviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiParameterScript: ApiParameterScript,
    private Router: Router,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    let query = `SELECT * FROM contact_admin Where id = ${this.data?.id};`;
    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((resd: any) => {
      if (resd.success && resd['data'].length > 0) {
        this.dataoffeedback = resd['data'][0];
        this.status = this.dataoffeedback.new;
        this.resolutionDetails = this.dataoffeedback.admin_message;
        if(this.status == 3){
          this.details = true;
        }else{
          this.details = false;
        }
      }
    });
  }
  saveResolution() {
    if(this.status == 1){
      Swal.fire('Change not Happen')
    }else{
      if(this.resolutionDetails == undefined || this.resolutionDetails == ''){
        let updateData = {
          "data": {
            "new": 2,
          },
          "whereConditions": { id: this.data?.id }
        }
        this.ApiParameterScript.updatedata('contact_admin', updateData).subscribe((res: any) => {
            this.ngOnInit();
        });
      }else{
        let updateData = {
          "data": {
            "new": 3,
            "admin_message":this.resolutionDetails
          },
          "whereConditions": { id: this.data?.id }
        }
        this.ApiParameterScript.updatedata('contact_admin', updateData).subscribe((res: any) => {
            this.ngOnInit();
        });
      }
    }
  }
  onStatusChange(data: any) {
    if (data.target.value == '3') {
      this.details = true;
    }else{
      this.details = false;
    }
  }
  close() {
    this.dialogRef.close();
  }
}
