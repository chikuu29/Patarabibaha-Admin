import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-subadmincreate',
  templateUrl: './subadmincreate.component.html',
  styleUrls: ['./subadmincreate.component.scss']
})
export class SubadmincreateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  admin = new FormGroup({
    name: new FormControl('', [Validators.required]),
    UserId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    conformpass: new FormControl('', [Validators.required])
  });
  id: any = '';
  constructor(
    private apiparameterscript: ApiParameterScript,
    private activatedroute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.activatedroute.params.subscribe((res: any) => {
      if (res.id != '') {
        this.id = res.id,
          this.getAllData(this.id)
      } else {
        this.id = ''
      }
    })
    this.admin = new FormGroup({
      name: new FormControl(''),
      UserId: new FormControl(''),
      Password: new FormControl(''),
      email_id: new FormControl(''),
      phone_number: new FormControl(''),
      conformpass: new FormControl('')
    });
  }
  createAdmin() {

    if (this.id == '') {
      //insert part done
      if (this.admin.value.name == '' || this.admin.value.name == null || this.admin.value.name == undefined) {
        Swal.fire({
          icon: 'error',
          text: 'SubAdmin Name Should Not Blanck'
        })
      } else if (this.admin.value.email_id == '' || this.admin.value.email_id == null || this.admin.value.email_id == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Email Should Not Blanck"
        })
      } else if (this.admin.value.phone_number == '' || this.admin.value.phone_number == null || this.admin.value.phone_number == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Phone Number Should Not Blanck"
        })
      } else if (this.admin.value.phone_number == '' || this.admin.value.phone_number == null || this.admin.value.phone_number == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Phone Number Should Not Blanck"
        })
      } else if (this.admin.value.UserId == '' || this.admin.value.UserId == null || this.admin.value.UserId == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's User Id Number Should Not Blanck"
        })
      } else if (this.admin.value.Password == '' || this.admin.value.Password == null || this.admin.value.Password == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Password Number Should Not Blanck"
        })
      } else {
        if (this.admin.value.Password == this.admin.value.conformpass) {
          
          let updateData = {
            "data": {
              'name': this.admin.value.name,
              'UserId': this.admin.value.UserId,
              'Password': this.admin.value.Password,
              'email_id': this.admin.value.email_id,
              'phone_number': this.admin.value.phone_number,
              'created_At': moment().toISOString(),
              'creater_name': 'Admin'
            }
          }
          this.apiparameterscript.savedata('admin', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "SubAdmin Created"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })

        } else {
          Swal.fire({
            icon: 'error',
            text: "Password and Conform Password Not match"
          })
        }
      }
    } else {
      //update part still panding
      if (this.admin.value.name == '' || this.admin.value.name == null || this.admin.value.name == undefined) {
        Swal.fire({
          icon: 'error',
          text: 'SubAdmin Name Should Not Blanck'
        })
      } else if (this.admin.value.email_id == '' || this.admin.value.email_id == null || this.admin.value.email_id == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Email Should Not Blanck"
        })
      } else if (this.admin.value.phone_number == '' || this.admin.value.phone_number == null || this.admin.value.phone_number == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Phone Number Should Not Blanck"
        })
      } else if (this.admin.value.phone_number == '' || this.admin.value.phone_number == null || this.admin.value.phone_number == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Phone Number Should Not Blanck"
        })
      } else if (this.admin.value.UserId == '' || this.admin.value.UserId == null || this.admin.value.UserId == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's User Id Number Should Not Blanck"
        })
      } else if (this.admin.value.Password == '' || this.admin.value.Password == null || this.admin.value.Password == undefined) {
        Swal.fire({
          icon: 'error',
          text: "SubAdmin 's Password Number Should Not Blanck"
        })
      } else {
        if (this.admin.value.Password == this.admin.value.conformpass) {
          
          let updateData = {
            "data": {
              'name': this.admin.value.name,
              'UserId': this.admin.value.UserId,
              'Password': this.admin.value.Password,
              'email_id': this.admin.value.email_id,
              'phone_number': this.admin.value.phone_number,
              'updated_At': moment().toISOString(),
              'creater_name': 'Admin'
            },
            "whereConditions": { id: this.id }
          }
          this.apiparameterscript.updatedata('admin', updateData).subscribe((res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                text: "SubAdmin Created"
              }).then(() => {
                this.ngOnInit();
              });
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: "Password and Conform Password Not match"
          })
        }
      }
    }
  }
  getAllData(data: any) {
    this.apiparameterscript.fetchdata('admin', { "projection": ["*"], "whereConditions": { Id: data } }).subscribe((res: any) => {
      if (res.success) {
        this.admin.patchValue(res['data'][0])
      }
    })

  }

}
