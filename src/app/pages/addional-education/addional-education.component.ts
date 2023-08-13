import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-addional-education',
  templateUrl: './addional-education.component.html',
  styleUrls: ['./addional-education.component.scss']
})
export class AddionalEducationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button: any = 'Submit';
  additionaleducation = new FormGroup({
    id: new FormControl(''),
    additional_education_name: new FormControl('', [Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.additionaleducation = new FormGroup({
      id: new FormControl(''),
      additional_education_name: new FormControl('')
    })
    this.button = 'Submit';
    this.getAllData();
  }
  public() {
    if (this.button == 'Submit') {
      if (this.additionaleducation.valid) {
        let updateData = {
          "data": {
            "additional_education_name": this.additionaleducation.value.additional_education_name,
            "additional_education_date_time": moment().toISOString()
          },
        }
        this.ApiParameter.savedata('additional_education', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: res.message
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Additional Education Name'
        })
      }
    } else if (this.button == 'Update') {
      if (this.additionaleducation.valid) {
        let updateData = {
          "data": {
            "additional_education_name": this.additionaleducation.value.additional_education_name,
          },
          "whereConditions": { id: this.additionaleducation.value.id }
        }
        this.ApiParameter.updatedata('additional_education', updateData).subscribe((res: any) => {
          // console.log(res);
          if (res.success) {
            Swal.fire({
              icon: 'success',
              text: res.message
            }).then((ress: any) => {
              this.ngOnInit()
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: res.message
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Additional Education Name'
        })
      }
    }

  }
  getAllData() {
    this.ApiParameter.fetchdata('additional_education', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success) {

        this.tabledata = res['data'];
      }
    })
  }
  update(data: any) {
    this.ApiParameter.fetchdata('additional_education', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      if (res.success) {
        this.button = 'Update';
        this.additionaleducation.patchValue(res['data'][0]);
      }
    })

  }
  deleted(data: any) {
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('additional_education', { "whereConditions": { id: data } }).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(() => {
          this.ngOnInit()
        });
      } else {
        Swal.fire('Error', res.message, 'error')
      }
    });
  }
  publish(data: any, status: any) {
    if (status == 1) {
      let updateData = {
        "data": {
          "status": 0,
        },
        "whereConditions": { id: data }
      }
      this.ApiParameter.updatedata('additional_education', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "Unpublished"
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

    } else if (status == 0) {
      let updateData = {
        "data": {
          "status": 1,
        },
        "whereConditions": { id: data }
      }
      this.ApiParameter.updatedata('additional_education', updateData).subscribe((res: any) => {
        // console.log(res);
        if (res.success) {
          Swal.fire({
            icon: 'success',
            text: "Published"
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

  }
}


