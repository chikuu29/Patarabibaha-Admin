import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { offset } from '@popperjs/core';
@Component({
  selector: 'app-highest-education',
  templateUrl: './highest-education.component.html',
  styleUrls: ['./highest-education.component.scss']
})
export class HighestEducationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button: any = 'Submit';
  highesteducation = new FormGroup({
    id: new FormControl(''),
    highest_education_name: new FormControl('', [Validators.required])
  });
  filterText:any;
  tabledata: any;
  collectionSize: number = 0
  page: number = 1
  totalCount: number = 0
  totalFetchrecord:number = 0
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.highesteducation = new FormGroup({
      id: new FormControl(''),
      highest_education_name: new FormControl('', [Validators.required])
    })
    this.button = 'Submit'
    this.getAllData();
  }
  getSearchText(event: any) {
    console.log(event);

    this.filterText = event
  }
  onpageChnage(){

  }
  public() {
    if (this.button == 'Submit') {
      if (this.highesteducation.valid) {
        let updateData = {
          "data": {
            "highest_education_name": this.highesteducation.value.highest_education_name,
            "highest_education_date_time": moment().toISOString()
          },
        }
        this.ApiParameter.savedata('highest_education', updateData).subscribe((res: any) => {
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
    } else if (this.button == 'Update') {
      if (this.highesteducation.valid) {
        let updateData = {
          "data": {
            "highest_education_name": this.highesteducation.value.highest_education_name,
          },
          "whereConditions": { id: this.highesteducation.value.id }
        }
        this.ApiParameter.updatedata('highest_education', updateData).subscribe((res: any) => {
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
    let offset = this.page * 10 - 10
    this.ApiParameter.fetchdata('highest_education', { "projection": ["*"] },offset,10).subscribe((res: any) => {
      this.totalFetchrecord = offset+res['count']
      this.totalCount = res['totalCount']
      this.collectionSize = res['totalCount']
      // console.log(res['data'][0]);
      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
      }
    })

  }
  update(data: any) {
    this.ApiParameter.fetchdata('highest_education', { "projection": ["*"], "whereConditions": { id: data } }).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.button = 'Update';
      if (res.success) {
        this.highesteducation.patchValue(res['data'][0]);
      }
    })
  }
  deleted(data: any) {
    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('highest_education', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('highest_education', updateData).subscribe((res: any) => {
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
      this.ApiParameter.updatedata('highest_education', updateData).subscribe((res: any) => {
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
