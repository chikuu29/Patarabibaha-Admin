import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button: any = 'Submit';
  religion = new FormGroup({
    id: new FormControl(''),
    religion_name: new FormControl('', [Validators.required])
  });
  filterText:any;
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.religion = new FormGroup({
      id: new FormControl(''),
      religion_name: new FormControl('')
    })
    this.button = 'Submit';
    this.getAllData();
  }
  public() {
    if (this.button == 'Submit') {
      if (this.religion.valid) {
        var updateData = {
          "data": {
            "religion_name": this.religion.value.religion_name,
            "created_At": moment().toISOString()
          },
        }
        this.ApiParameter.savedata('religion', updateData).subscribe((res: any) => {
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
        })
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Religion Name'
        })
      }
    }else if(this.button == 'Update'){
      if (this.religion.valid) {
        let updateData = {
          "data": {
            "religion_name": this.religion.value.religion_name,
          },
          "whereConditions": { id: this.religion.value.id }
        }
        this.ApiParameter.updatedata('religion', updateData).subscribe((res: any) => {
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
        })
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please Enter Highest Education Name'
        })
      }
    }

  }
  getAllData() {
    this.ApiParameter.fetchdata('religion', { "projection": ["*"] }).subscribe((res: any) => {
      if (res.success) {
        this.tabledata = res['data'];
      }
    })
  }
  update(data: any) {
    this.ApiParameter.fetchdata('religion', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.button = 'Update';
      if (res.success) {
        this.religion.patchValue(res['data'][0]);
      }
    })
  }
  deleted(data:any){
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('religion', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
  publish(id: any, status: any) {
    if (status == 1) {
      let updateData = {
        "data": {
          "status": 0,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('religion', updateData).subscribe((res: any) => {
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
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('religion', updateData).subscribe((res: any) => {
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
