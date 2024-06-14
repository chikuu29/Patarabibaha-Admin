import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emailphonecheck',
  templateUrl: './emailphonecheck.component.html',
  styleUrls: ['./emailphonecheck.component.scss'],
})
export class EmailphonecheckComponent implements OnInit {
  form: FormGroup;
  countrycode: any;
  constructor(
    public dialogRef: MatDialogRef<EmailphonecheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiParameterScript: ApiParameterScript,
    private Router: Router,
    private CommonService: CommonService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      phone: [false],
      phoneNumber: [''],
      email: [false],
      emailText: [''],
      countryCode: ['91'],
    });
  }

  ngOnInit(): void {
    this.ApiParameterScript.fetchdata('country', {
      projection: ['*'],
      whereConditions: {},
    },0,250).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        
        this.countrycode = res['data'];
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  phoneNo() {
    if (
      this.form.get('phoneNumber')?.value == '' ||
      this.form.get('phoneNumber')?.value == undefined
    ) {
      Swal.fire('Enter Phone No');
    } else if (this.form.get('phoneNumber')?.value === this.data.phone) {
      Swal.fire('Present in database');
    } else {
      this.ApiParameterScript.fetchdata('auth_user', {
        projection: ['*'],
        whereConditions: { auth_phone_no: this.form.get('phoneNumber')?.value },
      }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          Swal.fire(
            this.form.get('phoneNumber')?.value +
              ' This Phone no is present in database'
          );
        } else {
          //auth_user
          let updateData = {
            data: {
              auth_phone_no: this.form.get('phoneNumber')?.value,
            },
            whereConditions: {
              auth_ID: this.data.id,
            },
          };
          this.ApiParameterScript.updatedata('auth_user', updateData).subscribe(
            (res: any) => {
              if (res.success) {
                //user_info
                let updateData1 = {
                  data: {
                    user_phone_no: this.form.get('phoneNumber')?.value,
                    country_code: this.form.get('countryCode')?.value
                  },
                  whereConditions: {
                    user_id: this.data.id,
                  },
                };
                this.ApiParameterScript.updatedata(
                  'user_info',
                  updateData1
                ).subscribe((res: any) => {
                  if (res.success) {
                    Swal.fire('', res.message, 'success').then(() => {
                      this.ngOnInit();
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  }
  emailId() {
    if (
      this.form.get('emailText')?.value == '' ||
      this.form.get('emailText')?.value == undefined
    ) {
      Swal.fire('Enter Email id');
    } else if (this.form.get('emailText')?.value == this.data.email) {
      Swal.fire('Present in database');
    } else {
      this.ApiParameterScript.fetchdata('auth_user', {
        projection: ['*'],
        whereConditions: { auth_email: this.form.get('emailText')?.value },
      }).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          Swal.fire(
            this.form.get('emailText')?.value +
              ' This Email id is present in database'
          );
        } else {
          //auth_user
          let updateData = {
            data: {
              auth_email: this.form.get('emailText')?.value,
            },
            whereConditions: {
              auth_ID: this.data.id,
            },
          };
          this.ApiParameterScript.updatedata('auth_user', updateData).subscribe(
            (res: any) => {
              if (res.success) {
                //user_info
                let updateData1 = {
                  data: {
                    user_email: this.form.get('emailText')?.value,
                  },
                  whereConditions: {
                    user_id: this.data.id,
                  },
                };
                this.ApiParameterScript.updatedata(
                  'user_info',
                  updateData1
                ).subscribe((res: any) => {
                  if (res.success) {
                    //user_plan_deatils
                    let updateData2 = {
                      data: {
                        user_email: this.form.get('emailText')?.value,
                      },
                      whereConditions: {
                        user_email: this.data.email,
                      },
                    };
                    this.ApiParameterScript.updatedata(
                      'user_plan_deatils',
                      updateData2
                    ).subscribe((res: any) => {
                      if (res.success) {
                        Swal.fire('', res.message, 'success').then(() => {
                          this.ngOnInit();
                        });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  }
}
