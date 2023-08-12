import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  button :any = 'ADD'
  occupation = new FormGroup({
    id: new FormControl(''),
    occupation_name: new FormControl('', [Validators.required])
  })
  tabledata: any;
  constructor(
    private ApiParameter: ApiParameterScript
  ) { }

  ngOnInit(): void {
    this.occupation = new FormGroup({
      id: new FormControl(''),
      occupation_name: new FormControl('')
    })
    this.button= 'ADD'
    this.getAllData();
  }
  public() {


    if(this.button=='ADD'){

    if (this.occupation.valid) {
      let updateData = {
        "data": {
          "occupation_name": this.occupation.value.occupation_name,
          "created_At": moment().toISOString()
        },

      }

      this.ApiParameter.savedata('occupation', updateData).subscribe((res: any) => {
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


    } else if(this.button=='Update') {
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Occupation Name'
      })
    }
  }else{
    if (this.occupation.valid) {
      let updateData = {
        "data": {
          "occupation_name": this.occupation.value.occupation_name,
          //"created_At": moment().toISOString()
        },
        "whereConditions": { id: this.occupation.value.id }

      }

      this.ApiParameter.updatedata('occupation', updateData).subscribe((res: any) => {
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
        text: 'Please Enter Occupation Name'
      })
    }
  }

  }
  getAllData() {
    this.ApiParameter.fetchdata('occupation', { "projection": ["*"] , }).subscribe((res: any) => {
      // console.log(res['data'][0]);

      if (res.success) {
        //this.privacypalicy.patchValue(res['data'][0])
        this.tabledata = res['data'];
        // console.log(this.privacypalicy.patchValue(res['data'][0]));

      }
    })

  }
  update(data: any) {
    this.ApiParameter.fetchdata('occupation', { "projection": ["*"] ,"whereConditions": { id: data } }).subscribe((res: any) => {
      // console.log(res['data'][0]);
      this.button = 'Update';
      if (res.success) {
        this.occupation.patchValue(res['data'][0]);
      }
    })
  }
  deleted(data: any) {
    

    this.blockUI.start('Deleting...')
    this.ApiParameter.deletedata('occupation', { "whereConditions": { id: data } }).subscribe((res: any) => {
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
    if(status == 1){
      let updateData = {
        "data": {
          "status": 0,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('occupation', updateData).subscribe((res: any) => {
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

    }else if(status == 0){
      let updateData = {
        "data": {
          "status": 1,
        },
        "whereConditions": { id: id }
      }
      this.ApiParameter.updatedata('occupation', updateData).subscribe((res: any) => {
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
