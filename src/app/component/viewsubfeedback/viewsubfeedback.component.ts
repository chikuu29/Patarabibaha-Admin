import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewsubfeedback',
  templateUrl: './viewsubfeedback.component.html',
  styleUrls: ['./viewsubfeedback.component.scss'],
})
export class ViewsubfeedbackComponent implements OnInit {
  dataoffeedback: any;
  adminMessage:any;
  constructor(
    public dialogRef: MatDialogRef<ViewsubfeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiParameterScript: ApiParameterScript,
    private Router: Router,
    private CommonService: CommonService
  ) {}

  ngOnInit(): void {
    //alert(this.data?.id)
    let query = `SELECT Subject,Feedback,admin_message,status FROM enquir_feedback Where id = ${this.data?.id};`;
    this.ApiParameterScript.fetchDataFormQuery(query).subscribe((resd: any) => {
      if (resd.success && resd['data'].length > 0) {
        this.dataoffeedback = resd['data'][0];
      }
    });
  }
  closeFeedback() {
    this.dialogRef.close();
  }
  isAdminMessageEmpty(): boolean {
    return !this.dataoffeedback.admin_message || this.dataoffeedback.admin_message.trim() === '';
  }
  submitAdminMessage(){
    if(this.adminMessage == undefined || this.adminMessage == '' ){
      Swal.fire('Enter Admin Message');
    }else{
     let param ={
       admin_message : this.adminMessage,
       id:this.data?.id
      }
      this.CommonService.feedbackAdminEntry(param).subscribe((res:any)=>{
        this.ngOnInit();
      })
    }
  }
}
